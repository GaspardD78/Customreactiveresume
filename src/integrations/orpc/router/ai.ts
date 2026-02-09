import { ORPCError } from "@orpc/client";
import { AISDKError } from "ai";
import z, { ZodError } from "zod";
import { jobOfferSchema } from "@/schema/application/job-offer";
import { resumeDataSchema } from "@/schema/resume/data";
import { protectedProcedure } from "../context";
import { aiCredentialsSchema, aiProviderSchema, aiService, fileInputSchema, formatZodError } from "../services/ai";

/**
 * Wraps any error into an ORPCError with a meaningful message.
 * - AISDKError → BAD_GATEWAY with the provider's error message
 * - ZodError → BAD_REQUEST with validation details
 * - Other errors → BAD_GATEWAY with the original message preserved
 */
function handleAIError(error: unknown): never {
	if (error instanceof AISDKError) {
		throw new ORPCError("BAD_GATEWAY", { message: error.message });
	}

	if (error instanceof ZodError) {
		throw new ORPCError("BAD_REQUEST", { message: `Validation error: ${formatZodError(error)}` });
	}

	// Network errors (fetch failed, DNS, timeout, etc.) and any other errors
	const message = error instanceof Error ? error.message : String(error);
	throw new ORPCError("BAD_GATEWAY", { message: `AI provider error: ${message}` });
}

export const aiRouter = {
	testConnection: protectedProcedure
		.input(
			z.object({
				provider: aiProviderSchema,
				model: z.string(),
				apiKey: z.string(),
				baseURL: z.string(),
			}),
		)
		.handler(async ({ input }) => {
			try {
				return await aiService.testConnection(input);
			} catch (error) {
				handleAIError(error);
			}
		}),

	parsePdf: protectedProcedure
		.input(
			z.object({
				...aiCredentialsSchema.shape,
				file: fileInputSchema,
			}),
		)
		.handler(async ({ input }) => {
			try {
				return await aiService.parsePdf(input);
			} catch (error) {
				handleAIError(error);
			}
		}),

	parseDocx: protectedProcedure
		.input(
			z.object({
				...aiCredentialsSchema.shape,
				file: fileInputSchema,
				mediaType: z.enum([
					"application/msword",
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				]),
			}),
		)
		.handler(async ({ input }) => {
			try {
				return await aiService.parseDocx(input);
			} catch (error) {
				handleAIError(error);
			}
		}),

	parseJobOffer: protectedProcedure
		.input(
			z.object({
				...aiCredentialsSchema.shape,
				rawText: z.string().min(10),
			}),
		)
		.handler(async ({ input }) => {
			try {
				return await aiService.parseJobOffer(input);
			} catch (error) {
				handleAIError(error);
			}
		}),

	analyzeResume: protectedProcedure
		.input(
			z.object({
				...aiCredentialsSchema.shape,
				resumeData: resumeDataSchema,
				jobOffer: jobOfferSchema,
			}),
		)
		.handler(async ({ input }) => {
			try {
				return await aiService.analyzeResume(input);
			} catch (error) {
				handleAIError(error);
			}
		}),

	generateCoverLetter: protectedProcedure
		.input(
			z.object({
				...aiCredentialsSchema.shape,
				resumeData: resumeDataSchema,
				jobOffer: jobOfferSchema,
				instructions: z.string().optional(),
			}),
		)
		.handler(async ({ input }) => {
			try {
				return await aiService.generateCoverLetter(input);
			} catch (error) {
				handleAIError(error);
			}
		}),
};
