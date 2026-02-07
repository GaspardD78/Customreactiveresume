import z from "zod";
import { atsScoreSchema } from "./ats-score";
import { jobOfferSchema } from "./job-offer";

export const applicationStatusSchema = z.enum([
	"draft",
	"applied",
	"interview",
	"technical_test",
	"offer",
	"accepted",
	"rejected",
	"withdrawn",
]);

export type ApplicationStatus = z.infer<typeof applicationStatusSchema>;

export const contactSchema = z.object({
	id: z.string().describe("Identifiant unique du contact"),
	name: z.string().describe("Nom du contact"),
	role: z.string().optional().describe("Rôle / poste du contact"),
	email: z.string().email().optional().describe("Email du contact"),
	phone: z.string().optional().describe("Téléphone du contact"),
	linkedin: z.string().optional().describe("Profil LinkedIn du contact"),
	notes: z.string().optional().describe("Notes sur le contact"),
});

export type Contact = z.infer<typeof contactSchema>;

export const statusHistoryEntrySchema = z.object({
	status: applicationStatusSchema,
	date: z.string().describe("Date ISO du changement de statut"),
	note: z.string().optional().describe("Note associée au changement"),
});

export type StatusHistoryEntry = z.infer<typeof statusHistoryEntrySchema>;

export const applicationDataSchema = z.object({
	jobOffer: jobOfferSchema.describe("Données structurées de l'offre d'emploi"),
	status: applicationStatusSchema.describe("Statut actuel de la candidature"),
	statusHistory: z.array(statusHistoryEntrySchema).describe("Historique des changements de statut"),
	coverLetter: z.string().default("").describe("Lettre de motivation en HTML"),
	atsScore: atsScoreSchema.nullable().default(null).describe("Score ATS calculé par l'IA"),
	contacts: z.array(contactSchema).default([]).describe("Contacts liés à cette candidature"),
	notes: z.string().default("").describe("Notes personnelles"),
	nextAction: z.string().optional().describe("Prochaine action à effectuer"),
	nextActionDate: z.string().optional().describe("Date de la prochaine action"),
	appliedAt: z.string().optional().describe("Date de candidature"),
});

export type ApplicationData = z.infer<typeof applicationDataSchema>;

export const defaultApplicationData: ApplicationData = {
	jobOffer: {
		title: "",
		company: "",
		location: null,
		contractType: null,
		salary: null,
		description: "",
		requirements: [],
		hardSkills: [],
		softSkills: [],
		niceToHave: [],
		sourceUrl: null,
		sourcePlatform: null,
		rawText: "",
		publishedAt: null,
		closingDate: null,
	},
	status: "draft",
	statusHistory: [],
	coverLetter: "",
	atsScore: null,
	contacts: [],
	notes: "",
};
