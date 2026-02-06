import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { createOpenAI } from "@ai-sdk/openai";
import { createGateway, generateText, Output } from "ai";
import { createOllama } from "ai-sdk-ollama";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
import { match } from "ts-pattern";
import type { ZodError } from "zod";
import z, { flattenError } from "zod";
import docxParserSystemPrompt from "@/integrations/ai/prompts/docx-parser-system.md?raw";
import docxParserUserPrompt from "@/integrations/ai/prompts/docx-parser-user.md?raw";
import pdfParserSystemPrompt from "@/integrations/ai/prompts/pdf-parser-system.md?raw";
import pdfParserUserPrompt from "@/integrations/ai/prompts/pdf-parser-user.md?raw";
import type { ResumeData } from "@/schema/resume/data";
import { defaultResumeData, resumeDataSchema } from "@/schema/resume/data";

export const aiProviderSchema = z.enum(["ollama", "openai", "gemini", "anthropic", "groq", "vercel-ai-gateway"]);

export type AIProvider = z.infer<typeof aiProviderSchema>;

export type GetModelInput = {
	provider: AIProvider;
	model: string;
	apiKey: string;
	baseURL: string;
};

/**
 * Returns true if the provider natively supports file/image inputs in messages.
 * Providers that don't support multimodal file inputs will use text extraction instead.
 */
function supportsFileInput(provider: AIProvider): boolean {
	return match(provider)
		.with("openai", () => true)
		.with("anthropic", () => true)
		.with("gemini", () => true)
		.with("vercel-ai-gateway", () => true)
		.with("groq", () => false)
		.with("ollama", () => false)
		.exhaustive();
}

/**
 * Returns true if the provider requires an API key to function.
 * Ollama runs locally and does not need authentication.
 */
export function requiresApiKey(provider: AIProvider): boolean {
	return match(provider)
		.with("ollama", () => false)
		.otherwise(() => true);
}

/**
 * Extract text content from a PDF file encoded in base64.
 */
async function extractTextFromPdf(base64Data: string): Promise<string> {
	const buffer = Buffer.from(base64Data, "base64");
	const parser = new PDFParse({ data: buffer });
	try {
		const result = await parser.getText();
		return result.text;
	} finally {
		await parser.destroy();
	}
}

/**
 * Extract text content from a DOCX file encoded in base64.
 */
async function extractTextFromDocx(base64Data: string): Promise<string> {
	const buffer = Buffer.from(base64Data, "base64");
	const result = await mammoth.extractRawText({ buffer });
	return result.value;
}

function getModel(input: GetModelInput) {
	const { provider, model, apiKey } = input;
	const baseURL = input.baseURL || undefined;

	return match(provider)
		.with("openai", () => createOpenAI({ apiKey, baseURL }).languageModel(model))
		.with("ollama", () => createOllama({ apiKey: apiKey || undefined, baseURL }).languageModel(model))
		.with("anthropic", () => createAnthropic({ apiKey, baseURL }).languageModel(model))
		.with("groq", () => createGroq({ apiKey, baseURL }).languageModel(model))
		.with("vercel-ai-gateway", () => createGateway({ apiKey, baseURL }).languageModel(model))
		.with("gemini", () => createGoogleGenerativeAI({ apiKey, baseURL }).languageModel(model))
		.exhaustive();
}

export const aiCredentialsSchema = z.object({
	provider: aiProviderSchema,
	model: z.string(),
	apiKey: z.string(),
	baseURL: z.string(),
});

export const fileInputSchema = z.object({
	name: z.string(),
	data: z.string(), // base64 encoded
});

export type TestConnectionInput = z.infer<typeof aiCredentialsSchema>;

export async function testConnection(input: TestConnectionInput): Promise<boolean> {
	const RESPONSE_OK = "1";

	const result = await generateText({
		model: getModel(input),
		output: Output.choice({ options: [RESPONSE_OK] }),
		messages: [{ role: "user", content: `Respond with "${RESPONSE_OK}"` }],
	});

	return result.output === RESPONSE_OK;
}

export type ParsePdfInput = z.infer<typeof aiCredentialsSchema> & {
	file: z.infer<typeof fileInputSchema>;
};

export async function parsePdf(input: ParsePdfInput): Promise<ResumeData> {
	const model = getModel(input);
	const useFileInput = supportsFileInput(input.provider);

	const userContent: Parameters<typeof generateText>[0]["messages"][number]["content"] = useFileInput
		? [
				{ type: "text", text: pdfParserUserPrompt },
				{
					type: "file",
					filename: input.file.name,
					mediaType: "application/pdf" as const,
					data: input.file.data,
				},
			]
		: await extractTextFromPdf(input.file.data).then((text) => [
				{
					type: "text" as const,
					text: `${pdfParserUserPrompt}\n\n--- EXTRACTED RESUME TEXT ---\n\n${text}`,
				},
			]);

	const result = await generateText({
		model,
		output: Output.object({ schema: resumeDataSchema }),
		messages: [
			{ role: "system", content: pdfParserSystemPrompt },
			{ role: "user", content: userContent },
		],
	});

	return resumeDataSchema.parse({
		...result.output,
		customSections: [],
		picture: defaultResumeData.picture,
		metadata: defaultResumeData.metadata,
	});
}

export type ParseDocxInput = z.infer<typeof aiCredentialsSchema> & {
	file: z.infer<typeof fileInputSchema>;
	mediaType: "application/msword" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
};

export async function parseDocx(input: ParseDocxInput): Promise<ResumeData> {
	const model = getModel(input);
	const useFileInput = supportsFileInput(input.provider);

	const userContent: Parameters<typeof generateText>[0]["messages"][number]["content"] = useFileInput
		? [
				{ type: "text", text: docxParserUserPrompt },
				{
					type: "file",
					filename: input.file.name,
					mediaType: input.mediaType,
					data: input.file.data,
				},
			]
		: await extractTextFromDocx(input.file.data).then((text) => [
				{
					type: "text" as const,
					text: `${docxParserUserPrompt}\n\n--- EXTRACTED RESUME TEXT ---\n\n${text}`,
				},
			]);

	const result = await generateText({
		model,
		output: Output.object({ schema: resumeDataSchema }),
		messages: [
			{ role: "system", content: docxParserSystemPrompt },
			{ role: "user", content: userContent },
		],
	});

	return resumeDataSchema.parse({
		...result.output,
		customSections: [],
		picture: defaultResumeData.picture,
		metadata: defaultResumeData.metadata,
	});
}

export function formatZodError(error: ZodError): string {
	return JSON.stringify(flattenError(error));
}

export const aiService = {
	testConnection,
	parsePdf,
	parseDocx,
};
