import z from "zod";

export const keywordDetailSchema = z.object({
	keyword: z.string().describe("Mot-clé de l'offre"),
	required: z.boolean().describe("Requis ou souhaité"),
	found: z.boolean().describe("Trouvé dans le CV"),
	inSection: z.string().nullable().describe("Section du CV où le mot-clé a été trouvé"),
	synonym: z.string().nullable().describe("Synonyme trouvé si différent du mot-clé exact"),
});

export type KeywordDetail = z.infer<typeof keywordDetailSchema>;

export const gapSchema = z.object({
	keyword: z.string().describe("Compétence requise manquante"),
	severity: z.enum(["critical", "moderate", "minor"]).describe("Sévérité de la lacune"),
	suggestion: z.string().describe("Conseil sans inventer d'expérience"),
});

export type Gap = z.infer<typeof gapSchema>;

export const suggestionSchema = z.object({
	section: z.string().describe("Section du CV : experience, skills, summary, etc."),
	itemId: z.string().nullable().describe("ID de l'item dans la section"),
	type: z
		.enum(["reformulate", "reorder", "highlight", "add_keyword", "restructure"])
		.describe("Type d'action suggérée"),
	priority: z.enum(["high", "medium", "low"]).describe("Priorité de la suggestion"),
	message: z.string().describe("Explication du pourquoi"),
	original: z.string().nullable().describe("Texte actuel du CV"),
	proposed: z.string().nullable().describe("Texte reformulé proposé"),
});

export type Suggestion = z.infer<typeof suggestionSchema>;

export const atsScoreSchema = z.object({
	overall: z.number().min(0).max(100).describe("Score global pondéré"),
	keywordMatch: z.number().min(0).max(100).describe("Score de correspondance mots-clés (50% du global)"),
	structureScore: z.number().min(0).max(100).describe("Score de structure du CV (25% du global)"),
	completenessScore: z.number().min(0).max(100).describe("Score de complétude (25% du global)"),
	keywordDetails: z.array(keywordDetailSchema).describe("Détail de chaque mot-clé analysé"),
	gaps: z.array(gapSchema).describe("Lacunes identifiées par rapport à l'offre"),
	suggestions: z.array(suggestionSchema).describe("Suggestions d'amélioration par section"),
	summaryVerdict: z.string().describe("Diagnostic global en 2-3 phrases"),
});

export type AtsScore = z.infer<typeof atsScoreSchema>;
