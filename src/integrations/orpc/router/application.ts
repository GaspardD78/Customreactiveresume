import z from "zod";
import { applicationDataSchema, applicationStatusSchema } from "@/schema/application/data";
import { protectedProcedure } from "../context";
import { applicationService } from "../services/application";

export const applicationRouter = {
	list: protectedProcedure
		.input(
			z.object({
				status: applicationStatusSchema.optional(),
			}),
		)
		.handler(async ({ input, context }) => {
			return applicationService.list({ userId: context.user.id, status: input.status });
		}),

	getById: protectedProcedure.input(z.object({ id: z.string().uuid() })).handler(async ({ input, context }) => {
		return applicationService.getById({ id: input.id, userId: context.user.id });
	}),

	create: protectedProcedure
		.input(
			z.object({
				data: applicationDataSchema,
				resumeId: z.string().uuid().optional(),
			}),
		)
		.handler(async ({ input, context }) => {
			return applicationService.create({
				userId: context.user.id,
				data: input.data,
				resumeId: input.resumeId,
			});
		}),

	update: protectedProcedure
		.input(
			z.object({
				id: z.string().uuid(),
				data: applicationDataSchema,
			}),
		)
		.handler(async ({ input, context }) => {
			return applicationService.update({
				id: input.id,
				userId: context.user.id,
				data: input.data,
			});
		}),

	updateStatus: protectedProcedure
		.input(
			z.object({
				id: z.string().uuid(),
				status: applicationStatusSchema,
				note: z.string().optional(),
			}),
		)
		.handler(async ({ input, context }) => {
			return applicationService.updateStatus({
				id: input.id,
				userId: context.user.id,
				status: input.status,
				note: input.note,
			});
		}),

	updateCoverLetter: protectedProcedure
		.input(
			z.object({
				id: z.string().uuid(),
				coverLetter: z.string(),
			}),
		)
		.handler(async ({ input, context }) => {
			return applicationService.updateCoverLetter({
				id: input.id,
				userId: context.user.id,
				coverLetter: input.coverLetter,
			});
		}),

	linkResume: protectedProcedure
		.input(
			z.object({
				id: z.string().uuid(),
				resumeId: z.string().uuid(),
			}),
		)
		.handler(async ({ input, context }) => {
			return applicationService.linkResume({
				id: input.id,
				userId: context.user.id,
				resumeId: input.resumeId,
			});
		}),

	createOptimizedResume: protectedProcedure
		.input(z.object({ id: z.string().uuid() }))
		.handler(async ({ input, context }) => {
			return applicationService.createOptimizedResume({
				id: input.id,
				userId: context.user.id,
			});
		}),

	delete: protectedProcedure.input(z.object({ id: z.string().uuid() })).handler(async ({ input, context }) => {
		return applicationService.delete({
			id: input.id,
			userId: context.user.id,
		});
	}),
};
