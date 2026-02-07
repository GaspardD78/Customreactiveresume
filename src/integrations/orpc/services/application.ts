import { ORPCError } from "@orpc/client";
import { and, desc, eq } from "drizzle-orm";
import { schema } from "@/integrations/drizzle";
import { db } from "@/integrations/drizzle/client";
import type { AtsScore } from "@/schema/application/ats-score";
import type { ApplicationData, ApplicationStatus } from "@/schema/application/data";
import { generateId } from "@/utils/string";

export const applicationService = {
	list: async (input: { userId: string; status?: ApplicationStatus }) => {
		const conditions = [eq(schema.jobApplication.userId, input.userId)];

		const results = await db
			.select()
			.from(schema.jobApplication)
			.where(and(...conditions))
			.orderBy(desc(schema.jobApplication.updatedAt));

		// Filter by status in application data if specified
		if (input.status) {
			return results.filter((r) => (r.data as ApplicationData).status === input.status);
		}

		return results;
	},

	getById: async (input: { id: string; userId: string }) => {
		const [result] = await db
			.select()
			.from(schema.jobApplication)
			.where(and(eq(schema.jobApplication.id, input.id), eq(schema.jobApplication.userId, input.userId)));

		if (!result) {
			throw new ORPCError("NOT_FOUND", { message: "Application not found" });
		}

		return result;
	},

	create: async (input: { userId: string; data: ApplicationData; resumeId?: string }) => {
		const id = generateId();

		const [result] = await db
			.insert(schema.jobApplication)
			.values({
				id,
				userId: input.userId,
				resumeId: input.resumeId ?? null,
				data: input.data,
			})
			.returning();

		return result;
	},

	update: async (input: { id: string; userId: string; data: ApplicationData }) => {
		const [result] = await db
			.update(schema.jobApplication)
			.set({ data: input.data })
			.where(and(eq(schema.jobApplication.id, input.id), eq(schema.jobApplication.userId, input.userId)))
			.returning();

		if (!result) {
			throw new ORPCError("NOT_FOUND", { message: "Application not found" });
		}

		return result;
	},

	updateStatus: async (input: { id: string; userId: string; status: ApplicationStatus; note?: string }) => {
		const application = await applicationService.getById({ id: input.id, userId: input.userId });
		const data = application.data as ApplicationData;

		const historyEntry = {
			status: input.status,
			date: new Date().toISOString(),
			note: input.note,
		};

		const updatedData: ApplicationData = {
			...data,
			status: input.status,
			statusHistory: [...data.statusHistory, historyEntry],
			appliedAt: input.status === "applied" && !data.appliedAt ? new Date().toISOString() : data.appliedAt,
		};

		return applicationService.update({ id: input.id, userId: input.userId, data: updatedData });
	},

	updateAtsScore: async (input: { id: string; userId: string; atsScore: AtsScore }) => {
		const application = await applicationService.getById({ id: input.id, userId: input.userId });
		const data = application.data as ApplicationData;

		const updatedData: ApplicationData = {
			...data,
			atsScore: input.atsScore,
		};

		return applicationService.update({ id: input.id, userId: input.userId, data: updatedData });
	},

	updateCoverLetter: async (input: { id: string; userId: string; coverLetter: string }) => {
		const application = await applicationService.getById({ id: input.id, userId: input.userId });
		const data = application.data as ApplicationData;

		const updatedData: ApplicationData = {
			...data,
			coverLetter: input.coverLetter,
		};

		return applicationService.update({ id: input.id, userId: input.userId, data: updatedData });
	},

	linkResume: async (input: { id: string; userId: string; resumeId: string }) => {
		const [result] = await db
			.update(schema.jobApplication)
			.set({ resumeId: input.resumeId })
			.where(and(eq(schema.jobApplication.id, input.id), eq(schema.jobApplication.userId, input.userId)))
			.returning();

		if (!result) {
			throw new ORPCError("NOT_FOUND", { message: "Application not found" });
		}

		return result;
	},

	linkOptimizedResume: async (input: { id: string; userId: string; optimizedResumeId: string }) => {
		const [result] = await db
			.update(schema.jobApplication)
			.set({ optimizedResumeId: input.optimizedResumeId })
			.where(and(eq(schema.jobApplication.id, input.id), eq(schema.jobApplication.userId, input.userId)))
			.returning();

		if (!result) {
			throw new ORPCError("NOT_FOUND", { message: "Application not found" });
		}

		return result;
	},

	delete: async (input: { id: string; userId: string }) => {
		const [result] = await db
			.delete(schema.jobApplication)
			.where(and(eq(schema.jobApplication.id, input.id), eq(schema.jobApplication.userId, input.userId)))
			.returning();

		if (!result) {
			throw new ORPCError("NOT_FOUND", { message: "Application not found" });
		}

		return result;
	},

	createOptimizedResume: async (input: { id: string; userId: string }) => {
		const application = await applicationService.getById({ id: input.id, userId: input.userId });

		if (!application.resumeId) {
			throw new ORPCError("BAD_REQUEST", { message: "No resume linked to this application" });
		}

		// Get the original resume
		const [originalResume] = await db
			.select()
			.from(schema.resume)
			.where(and(eq(schema.resume.id, application.resumeId), eq(schema.resume.userId, input.userId)));

		if (!originalResume) {
			throw new ORPCError("NOT_FOUND", { message: "Linked resume not found" });
		}

		const data = application.data as ApplicationData;
		const companyName = data.jobOffer.company || "Optimisé";
		const newName = `${originalResume.name} — ${companyName}`;
		const newSlug = `${originalResume.slug}-${companyName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`;

		// Duplicate the resume
		const newId = generateId();
		const [newResume] = await db
			.insert(schema.resume)
			.values({
				id: newId,
				name: newName,
				slug: newSlug,
				tags: [...originalResume.tags, "optimisé"],
				data: originalResume.data,
				userId: input.userId,
			})
			.returning();

		// Link the optimized resume to the application
		await applicationService.linkOptimizedResume({
			id: input.id,
			userId: input.userId,
			optimizedResumeId: newId,
		});

		return newResume;
	},
};
