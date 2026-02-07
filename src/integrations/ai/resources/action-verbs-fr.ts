/**
 * Pool de verbes d'action français pour les reformulations IA.
 * Organisé par catégorie pour garantir la variété dans les suggestions.
 */
export const ACTION_VERBS_FR = {
	leadership: ["piloté", "coordonné", "dirigé", "supervisé", "encadré", "animé", "fédéré", "mobilisé"],
	creation: ["conçu", "développé", "créé", "élaboré", "architecturé", "bâti", "lancé", "initié"],
	improvement: ["optimisé", "amélioré", "restructuré", "modernisé", "renforcé", "simplifié", "fluidifié", "accéléré"],
	analysis: ["analysé", "diagnostiqué", "évalué", "audité", "cartographié", "identifié", "mesuré", "quantifié"],
	delivery: ["livré", "déployé", "implémenté", "mis en production", "intégré", "industrialisé", "automatisé"],
	communication: ["présenté", "formé", "rédigé", "négocié", "convaincu", "accompagné", "sensibilisé", "vulgarisé"],
} as const;

export type ActionVerbCategory = keyof typeof ACTION_VERBS_FR;
