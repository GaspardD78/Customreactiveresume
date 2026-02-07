import type { ZodSchema } from "zod";

/**
 * Extracts JSON from an AI response that may contain an <analysis> block.
 * The <analysis> block is used for chain-of-thought reasoning and is stripped
 * before parsing the JSON output.
 */
export function extractJsonFromResponse(rawResponse: string): string {
	// Remove the <analysis>...</analysis> block if present
	let cleaned = rawResponse.replace(/<analysis>[\s\S]*?<\/analysis>/gi, "").trim();

	// Try to extract JSON from markdown code blocks if present
	const codeBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
	if (codeBlockMatch?.[1]) {
		cleaned = codeBlockMatch[1].trim();
	}

	// Find the first { or [ and last } or ] to extract the JSON object/array
	const firstBrace = cleaned.indexOf("{");
	const firstBracket = cleaned.indexOf("[");
	const start =
		firstBrace === -1 ? firstBracket : firstBracket === -1 ? firstBrace : Math.min(firstBrace, firstBracket);

	if (start === -1) {
		throw new Error("No JSON object found in AI response");
	}

	const isArray = cleaned[start] === "[";
	const closingChar = isArray ? "]" : "}";

	// Find the matching closing character
	let depth = 0;
	let end = -1;
	for (let i = start; i < cleaned.length; i++) {
		if (cleaned[i] === (isArray ? "[" : "{")) depth++;
		if (cleaned[i] === closingChar) depth--;
		if (depth === 0) {
			end = i;
			break;
		}
	}

	if (end === -1) {
		throw new Error("Malformed JSON in AI response: unmatched braces");
	}

	return cleaned.slice(start, end + 1);
}

/**
 * Extracts the <analysis> block from an AI response for logging/debugging.
 * Returns null if no analysis block is found.
 */
export function extractAnalysisBlock(rawResponse: string): string | null {
	const match = rawResponse.match(/<analysis>([\s\S]*?)<\/analysis>/i);
	return match?.[1]?.trim() ?? null;
}

/**
 * Parses an AI response containing an optional <analysis> block and a JSON output.
 * Validates the JSON against the provided Zod schema.
 *
 * @param rawResponse - The raw text response from the AI model
 * @param schema - The Zod schema to validate against
 * @returns The parsed and validated data along with the reasoning block
 */
export function parseAIResponse<T>(rawResponse: string, schema: ZodSchema<T>): { data: T; reasoning: string | null } {
	const reasoning = extractAnalysisBlock(rawResponse);
	const jsonString = extractJsonFromResponse(rawResponse);

	let parsed: unknown;
	try {
		parsed = JSON.parse(jsonString);
	} catch {
		throw new Error(`Failed to parse JSON from AI response: ${jsonString.slice(0, 200)}...`);
	}

	const result = schema.safeParse(parsed);

	if (!result.success) {
		const errors = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
		throw new Error(`AI response validation failed: ${errors}`);
	}

	return { data: result.data, reasoning };
}

/**
 * Builds a correction prompt to send back to the AI when its JSON output is invalid.
 * Used for retry logic.
 */
export function buildCorrectionPrompt(jsonString: string, validationErrors: string): string {
	return [
		"The JSON you produced contains the following validation errors:",
		"",
		validationErrors,
		"",
		"Here is the JSON you produced:",
		jsonString.slice(0, 2000),
		"",
		"Please fix ONLY the JSON errors. Do not change your analysis. Output ONLY the corrected JSON.",
	].join("\n");
}

/**
 * Extracts the HTML content from a cover letter AI response.
 * The response may contain an <analysis> block followed by HTML.
 */
export function extractHtmlFromResponse(rawResponse: string): { html: string; reasoning: string | null } {
	const reasoning = extractAnalysisBlock(rawResponse);

	// Remove the analysis block
	let cleaned = rawResponse.replace(/<analysis>[\s\S]*?<\/analysis>/gi, "").trim();

	// Remove markdown code blocks if present
	const codeBlockMatch = cleaned.match(/```(?:html)?\s*([\s\S]*?)```/);
	if (codeBlockMatch?.[1]) {
		cleaned = codeBlockMatch[1].trim();
	}

	// The remaining content should be HTML
	// Basic validation: should contain at least one HTML tag
	if (!/<[a-z][\s\S]*>/i.test(cleaned)) {
		throw new Error("No HTML content found in AI response");
	}

	return { html: cleaned, reasoning };
}
