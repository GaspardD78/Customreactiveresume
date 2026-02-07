import { ORPCError } from "@orpc/client";
import { AISDKError } from "ai";
import z, { ZodError } from "zod";
import { jobOfferSchema } from "@/schema/application/job-offer";
import { resumeDataSchema } from "@/schema/resume/data";
import { protectedProcedure } from "../context";
import { aiCredentialsSchema, aiProviderSchema, aiService, fileInputSchema, formatZodError } from "../services/ai";

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
				if (error instanceof AISDKError) {
					throw new ORPCError("BAD_GATEWAY", { message: error.message });
				}

				throw error;
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
				if (error instanceof AISDKError) {
					throw new ORPCError("BAD_GATEWAY", { message: error.message });
				}

				if (error instanceof ZodError) {
					throw new Error(formatZodError(error));
				}
				throw error;
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
				if (error instanceof AISDKError) {
					throw new ORPCError("BAD_GATEWAY", { message: error.message });
				}

				if (error instanceof ZodError) {
					throw new Error(formatZodError(error));
				}

				throw error;
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
				if (error instanceof AISDKError) {
					throw new ORPCError("BAD_GATEWAY", { message: error.message });
				}

				if (error instanceof ZodError) {
					throw new Error(formatZodError(error));
				}

				throw error;
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
				if (error instanceof AISDKError) {
					throw new ORPCError("BAD_GATEWAY", { message: error.message });
				}

				if (error instanceof ZodError) {
					throw new Error(formatZodError(error));
				}

				throw error;
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
				if (error instanceof AISDKError) {
					throw new ORPCError("BAD_GATEWAY", { message: error.message });
				}

				if (error instanceof ZodError) {
					throw new Error(formatZodError(error));
				}

				throw error;
			}
		}),
};
