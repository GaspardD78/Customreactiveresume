import z from "zod";

export const sourcePlatformSchema = z.enum(["apec", "hellowork", "linkedin", "indeed", "other"]);

export type SourcePlatform = z.infer<typeof sourcePlatformSchema>;

export const jobOfferSchema = z.object({
	title: z.string().describe("Intitulé exact du poste"),
	company: z.string().describe("Nom exact de l'entreprise"),
	location: z.string().nullable().default(null).describe("Lieu du poste"),
	contractType: z
		.string()
		.nullable()
		.default(null)
		.describe("Type de contrat : CDI, CDD, freelance, stage, alternance, intérim"),
	salary: z.string().nullable().default(null).describe("Fourchette salariale telle que mentionnée"),
	description: z.string().default("").describe("Description complète de la mission"),
	requirements: z.array(z.string()).default([]).describe("Exigences telles que formulées dans l'offre"),
	hardSkills: z.array(z.string()).default([]).describe("Compétences techniques extraites textuellement"),
	softSkills: z.array(z.string()).default([]).describe("Compétences comportementales extraites"),
	niceToHave: z.array(z.string()).default([]).describe("Compétences souhaitées mais non requises"),
	sourceUrl: z.string().url().nullable().catch(null).describe("URL source de l'offre"),
	sourcePlatform: sourcePlatformSchema.nullable().catch(null).describe("Plateforme source"),
	rawText: z.string().default("").describe("Texte brut de l'offre collé par l'utilisateur"),
	publishedAt: z.string().nullable().catch(null).describe("Date de publication ISO"),
	closingDate: z.string().nullable().catch(null).describe("Date de clôture ISO"),
});

export type JobOffer = z.infer<typeof jobOfferSchema>;

export const defaultJobOffer: JobOffer = {
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
};
