import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import {
	ArrowLeftIcon,
	BriefcaseIcon,
	ChartBarIcon,
	CopyIcon,
	EnvelopeSimpleIcon,
	ListChecksIcon,
	SparkleIcon,
} from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAIStore } from "@/integrations/ai/store";
import { orpc } from "@/integrations/orpc/client";
import type { ApplicationData } from "@/schema/application/data";
import { DashboardHeader } from "../../-components/header";
import { AtsScoreGauge } from "../-components/ats-score-gauge";
import { StatusBadge } from "../-components/status-badge";

export const Route = createFileRoute("/dashboard/applications/$applicationId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { applicationId } = Route.useParams();
	const aiStore = useAIStore();

	const { data: application, refetch } = useQuery(
		orpc.application.getById.queryOptions({ input: { id: applicationId } }),
	);

	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
	const [coverLetterInstructions, setCoverLetterInstructions] = useState("");

	const updateMutation = useMutation(orpc.application.update.mutationOptions({ onSuccess: () => refetch() }));
	const updateStatusMutation = useMutation(
		orpc.application.updateStatus.mutationOptions({ onSuccess: () => refetch() }),
	);
	const updateCoverLetterMutation = useMutation(
		orpc.application.updateCoverLetter.mutationOptions({ onSuccess: () => refetch() }),
	);
	const createOptimizedResumeMutation = useMutation(
		orpc.application.createOptimizedResume.mutationOptions({ onSuccess: () => refetch() }),
	);

	if (!application) return null;

	const data = application.data as ApplicationData;
	const { jobOffer, atsScore, coverLetter, status, statusHistory, contacts, notes } = data;

	const handleAnalyzeResume = async () => {
		if (!application.resumeId || !aiStore.enabled) return;
		setIsAnalyzing(true);

		try {
			const resume = await orpc.resume.getById.call({ id: application.resumeId });
			const score = await orpc.ai.analyzeResume.call({
				provider: aiStore.provider,
				model: aiStore.model,
				apiKey: aiStore.apiKey,
				baseURL: aiStore.baseURL,
				resumeData: resume.data,
				jobOffer,
			});

			const updatedData: ApplicationData = { ...data, atsScore: score };
			await updateMutation.mutateAsync({ id: applicationId, data: updatedData });
		} catch (error) {
			console.error("Analysis failed:", error);
		} finally {
			setIsAnalyzing(false);
		}
	};

	const handleGenerateCoverLetter = async () => {
		if (!application.resumeId || !aiStore.enabled) return;
		setIsGeneratingLetter(true);

		try {
			const resume = await orpc.resume.getById.call({ id: application.resumeId });
			const html = await orpc.ai.generateCoverLetter.call({
				provider: aiStore.provider,
				model: aiStore.model,
				apiKey: aiStore.apiKey,
				baseURL: aiStore.baseURL,
				resumeData: resume.data,
				jobOffer,
				instructions: coverLetterInstructions || undefined,
			});

			await updateCoverLetterMutation.mutateAsync({ id: applicationId, coverLetter: html });
		} catch (error) {
			console.error("Cover letter generation failed:", error);
		} finally {
			setIsGeneratingLetter(false);
		}
	};

	const handleCreateOptimizedResume = () => {
		createOptimizedResumeMutation.mutate({ id: applicationId });
	};

	return (
		<div className="space-y-4">
			{/* Header */}
			<div className="flex items-center gap-4">
				<Button asChild variant="ghost" size="icon">
					<Link to="/dashboard/applications">
						<ArrowLeftIcon />
					</Link>
				</Button>
				<div className="flex-1">
					<DashboardHeader icon={BriefcaseIcon} title={jobOffer.title || t`Application`} />
					<div className="mt-1 flex items-center gap-2">
						{jobOffer.company && <span className="text-muted-foreground text-sm">{jobOffer.company}</span>}
						<StatusBadge status={status} />
					</div>
				</div>
				{atsScore && <AtsScoreGauge score={atsScore.overall} size="lg" />}
			</div>

			<Separator />

			{/* Tabs */}
			<Tabs defaultValue="offer">
				<TabsList>
					<TabsTrigger value="offer">
						<BriefcaseIcon className="size-4" />
						<Trans>Job Offer</Trans>
					</TabsTrigger>
					<TabsTrigger value="analysis">
						<ChartBarIcon className="size-4" />
						<Trans>AI Analysis</Trans>
					</TabsTrigger>
					<TabsTrigger value="cover-letter">
						<EnvelopeSimpleIcon className="size-4" />
						<Trans>Cover Letter</Trans>
					</TabsTrigger>
					<TabsTrigger value="tracking">
						<ListChecksIcon className="size-4" />
						<Trans>Tracking</Trans>
					</TabsTrigger>
				</TabsList>

				{/* Job Offer Tab */}
				<TabsContent value="offer" className="space-y-4">
					<div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
						<div>
							<Label className="text-muted-foreground text-xs">
								<Trans>Position</Trans>
							</Label>
							<p className="font-medium">{jobOffer.title || "\u2014"}</p>
						</div>
						<div>
							<Label className="text-muted-foreground text-xs">
								<Trans>Company</Trans>
							</Label>
							<p className="font-medium">{jobOffer.company || "\u2014"}</p>
						</div>
						<div>
							<Label className="text-muted-foreground text-xs">
								<Trans>Location</Trans>
							</Label>
							<p>{jobOffer.location || "\u2014"}</p>
						</div>
						<div>
							<Label className="text-muted-foreground text-xs">
								<Trans>Contract Type</Trans>
							</Label>
							<p>{jobOffer.contractType || "\u2014"}</p>
						</div>
						<div>
							<Label className="text-muted-foreground text-xs">
								<Trans>Salary</Trans>
							</Label>
							<p>{jobOffer.salary || "\u2014"}</p>
						</div>
					</div>

					{jobOffer.hardSkills.length > 0 && (
						<div className="space-y-2">
							<Label className="text-muted-foreground text-xs">
								<Trans>Required Skills</Trans>
							</Label>
							<div className="flex flex-wrap gap-1.5">
								{jobOffer.hardSkills.map((skill) => (
									<span key={skill} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs">
										{skill}
									</span>
								))}
							</div>
						</div>
					)}

					{jobOffer.niceToHave.length > 0 && (
						<div className="space-y-2">
							<Label className="text-muted-foreground text-xs">
								<Trans>Nice to Have</Trans>
							</Label>
							<div className="flex flex-wrap gap-1.5">
								{jobOffer.niceToHave.map((skill) => (
									<span key={skill} className="rounded-full bg-muted px-2.5 py-0.5 text-xs">
										{skill}
									</span>
								))}
							</div>
						</div>
					)}

					{jobOffer.description && (
						<div className="space-y-2">
							<Label className="text-muted-foreground text-xs">
								<Trans>Description</Trans>
							</Label>
							<p className="text-sm leading-relaxed">{jobOffer.description}</p>
						</div>
					)}
				</TabsContent>

				{/* AI Analysis Tab */}
				<TabsContent value="analysis" className="space-y-4">
					{!application.resumeId ? (
						<p className="text-muted-foreground text-sm">
							<Trans>Link a resume to this application to run an AI analysis.</Trans>
						</p>
					) : !aiStore.enabled ? (
						<p className="text-muted-foreground text-sm">
							<Trans>Configure an AI provider in Settings to enable analysis.</Trans>
						</p>
					) : (
						<div className="space-y-4">
							<div className="flex gap-3">
								<Button onClick={handleAnalyzeResume} disabled={isAnalyzing}>
									<SparkleIcon className="size-4" />
									{isAnalyzing ? (
										<Trans>Analyzing...</Trans>
									) : atsScore ? (
										<Trans>Re-analyze</Trans>
									) : (
										<Trans>Run Analysis</Trans>
									)}
								</Button>

								{atsScore && (
									<Button
										variant="outline"
										onClick={handleCreateOptimizedResume}
										disabled={createOptimizedResumeMutation.isPending}
									>
										<CopyIcon className="size-4" />
										<Trans>Create Optimized Resume</Trans>
									</Button>
								)}
							</div>

							{atsScore && (
								<div className="space-y-6">
									{/* Score overview */}
									<div className="grid grid-cols-4 gap-4">
										<div className="flex flex-col items-center rounded-lg border p-4">
											<AtsScoreGauge score={atsScore.overall} size="lg" />
											<span className="mt-2 text-muted-foreground text-xs">
												<Trans>Overall</Trans>
											</span>
										</div>
										<div className="flex flex-col items-center rounded-lg border p-4">
											<AtsScoreGauge score={atsScore.keywordMatch} size="md" />
											<span className="mt-2 text-muted-foreground text-xs">
												<Trans>Keywords</Trans>
											</span>
										</div>
										<div className="flex flex-col items-center rounded-lg border p-4">
											<AtsScoreGauge score={atsScore.structureScore} size="md" />
											<span className="mt-2 text-muted-foreground text-xs">
												<Trans>Structure</Trans>
											</span>
										</div>
										<div className="flex flex-col items-center rounded-lg border p-4">
											<AtsScoreGauge score={atsScore.completenessScore} size="md" />
											<span className="mt-2 text-muted-foreground text-xs">
												<Trans>Completeness</Trans>
											</span>
										</div>
									</div>

									{/* Summary verdict */}
									<div className="rounded-lg border bg-card p-4">
										<h4 className="font-medium text-sm">
											<Trans>Verdict</Trans>
										</h4>
										<p className="mt-1 text-muted-foreground text-sm leading-relaxed">{atsScore.summaryVerdict}</p>
									</div>

									{/* Keywords */}
									<div className="space-y-2">
										<h4 className="font-medium text-sm">
											<Trans>Keywords Analysis</Trans>
										</h4>
										<div className="flex flex-wrap gap-1.5">
											{atsScore.keywordDetails.map((kd) => (
												<span
													key={kd.keyword}
													className={`rounded-full px-2.5 py-0.5 text-xs ${kd.found ? "bg-green-500/15 text-green-700 dark:text-green-400" : "bg-red-500/15 text-red-700 dark:text-red-400"}`}
												>
													{kd.keyword}
													{kd.synonym && ` (\u2192 ${kd.synonym})`}
												</span>
											))}
										</div>
									</div>

									{/* Gaps */}
									{atsScore.gaps.length > 0 && (
										<div className="space-y-2">
											<h4 className="font-medium text-sm">
												<Trans>Identified Gaps</Trans>
											</h4>
											{atsScore.gaps.map((gap, i) => (
												<div key={i} className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
													<div className="flex items-center gap-2">
														<span className="font-medium text-sm">{gap.keyword}</span>
														<span
															className={`rounded px-1.5 py-0.5 text-[0.65rem] ${gap.severity === "critical" ? "bg-red-500/15 text-red-600" : gap.severity === "moderate" ? "bg-amber-500/15 text-amber-600" : "bg-gray-500/15 text-gray-600"}`}
														>
															{gap.severity}
														</span>
													</div>
													<p className="mt-1 text-muted-foreground text-xs">{gap.suggestion}</p>
												</div>
											))}
										</div>
									)}

									{/* Suggestions */}
									{atsScore.suggestions.length > 0 && (
										<div className="space-y-2">
											<h4 className="font-medium text-sm">
												<Trans>Suggestions</Trans>
											</h4>
											{atsScore.suggestions.map((sug, i) => (
												<div key={i} className="rounded-lg border p-3">
													<div className="flex items-center gap-2">
														<span className="rounded bg-primary/10 px-1.5 py-0.5 text-[0.65rem]">{sug.section}</span>
														<span className="rounded bg-muted px-1.5 py-0.5 text-[0.65rem]">{sug.type}</span>
														<span
															className={`rounded px-1.5 py-0.5 text-[0.65rem] ${sug.priority === "high" ? "bg-red-500/15 text-red-600" : sug.priority === "medium" ? "bg-amber-500/15 text-amber-600" : "bg-gray-500/15 text-gray-600"}`}
														>
															{sug.priority}
														</span>
													</div>
													<p className="mt-1 text-sm">{sug.message}</p>
													{sug.original && (
														<div className="mt-2 space-y-1 text-xs">
															<p className="text-muted-foreground line-through">{sug.original}</p>
															{sug.proposed && <p className="text-green-600 dark:text-green-400">{sug.proposed}</p>}
														</div>
													)}
												</div>
											))}
										</div>
									)}
								</div>
							)}
						</div>
					)}
				</TabsContent>

				{/* Cover Letter Tab */}
				<TabsContent value="cover-letter" className="space-y-4">
					{!application.resumeId ? (
						<p className="text-muted-foreground text-sm">
							<Trans>Link a resume to generate a cover letter.</Trans>
						</p>
					) : !aiStore.enabled ? (
						<p className="text-muted-foreground text-sm">
							<Trans>Configure an AI provider in Settings to generate cover letters.</Trans>
						</p>
					) : (
						<div className="space-y-4">
							<div className="space-y-2">
								<Label className="text-sm">
									<Trans>Instructions (optional)</Trans>
								</Label>
								<Textarea
									rows={3}
									value={coverLetterInstructions}
									onChange={(e) => setCoverLetterInstructions(e.target.value)}
									placeholder={t`e.g., Formal tone, emphasize my management experience, keep it under 300 words...`}
								/>
							</div>

							<Button onClick={handleGenerateCoverLetter} disabled={isGeneratingLetter}>
								<SparkleIcon className="size-4" />
								{isGeneratingLetter ? (
									<Trans>Generating...</Trans>
								) : coverLetter ? (
									<Trans>Regenerate</Trans>
								) : (
									<Trans>Generate Cover Letter</Trans>
								)}
							</Button>

							{coverLetter && (
								<div className="space-y-2">
									<Label className="text-sm">
										<Trans>Generated Cover Letter</Trans>
									</Label>
									<div
										className="prose prose-sm dark:prose-invert max-w-none rounded-lg border bg-card p-6"
										// biome-ignore lint/security/noDangerouslySetInnerHtml: AI-generated HTML cover letter
										dangerouslySetInnerHTML={{ __html: coverLetter }}
									/>
								</div>
							)}
						</div>
					)}
				</TabsContent>

				{/* Tracking Tab */}
				<TabsContent value="tracking" className="space-y-4">
					{/* Status changer */}
					<div className="space-y-3">
						<Label className="font-medium text-sm">
							<Trans>Update Status</Trans>
						</Label>
						<div className="flex flex-wrap gap-2">
							{(
								[
									"draft",
									"applied",
									"interview",
									"technical_test",
									"offer",
									"accepted",
									"rejected",
									"withdrawn",
								] as const
							).map((s) => (
								<Button
									key={s}
									size="sm"
									variant={status === s ? "default" : "outline"}
									onClick={() => updateStatusMutation.mutate({ id: applicationId, status: s })}
									disabled={updateStatusMutation.isPending}
								>
									{s.replace("_", " ")}
								</Button>
							))}
						</div>
					</div>

					{/* Status history */}
					{statusHistory.length > 0 && (
						<div className="space-y-2">
							<Label className="font-medium text-sm">
								<Trans>History</Trans>
							</Label>
							<div className="space-y-2">
								{statusHistory.map((entry, i) => (
									<div key={i} className="flex items-center gap-3 text-sm">
										<span className="text-muted-foreground text-xs">{new Date(entry.date).toLocaleDateString()}</span>
										<StatusBadge status={entry.status} />
										{entry.note && <span className="text-muted-foreground text-xs">&mdash; {entry.note}</span>}
									</div>
								))}
							</div>
						</div>
					)}

					{/* Notes */}
					<div className="space-y-2">
						<Label className="font-medium text-sm">
							<Trans>Notes</Trans>
						</Label>
						<Textarea
							rows={4}
							value={notes}
							onChange={(e) => {
								const updatedData: ApplicationData = { ...data, notes: e.target.value };
								updateMutation.mutate({ id: applicationId, data: updatedData });
							}}
							placeholder={t`Add notes about this application...`}
						/>
					</div>

					{/* Next action */}
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label className="text-sm">
								<Trans>Next Action</Trans>
							</Label>
							<Textarea
								rows={2}
								value={data.nextAction ?? ""}
								onChange={(e) => {
									const updatedData: ApplicationData = { ...data, nextAction: e.target.value };
									updateMutation.mutate({ id: applicationId, data: updatedData });
								}}
								placeholder={t`e.g., Prepare for technical interview...`}
							/>
						</div>
						<div className="space-y-2">
							<Label className="text-sm">
								<Trans>Next Action Date</Trans>
							</Label>
							<input
								type="date"
								value={data.nextActionDate ?? ""}
								onChange={(e) => {
									const updatedData: ApplicationData = { ...data, nextActionDate: e.target.value };
									updateMutation.mutate({ id: applicationId, data: updatedData });
								}}
								className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm"
							/>
						</div>
					</div>

					{/* Contacts */}
					<div className="space-y-2">
						<Label className="font-medium text-sm">
							<Trans>Contacts</Trans>
						</Label>
						{contacts.length === 0 ? (
							<p className="text-muted-foreground text-xs">
								<Trans>No contacts added yet.</Trans>
							</p>
						) : (
							<div className="space-y-2">
								{contacts.map((contact) => (
									<div key={contact.id} className="rounded-lg border p-3 text-sm">
										<p className="font-medium">{contact.name}</p>
										{contact.role && <p className="text-muted-foreground text-xs">{contact.role}</p>}
										{contact.email && <p className="text-muted-foreground text-xs">{contact.email}</p>}
									</div>
								))}
							</div>
						)}
					</div>

					{/* Linked resume info */}
					{application.resumeId && (
						<div className="space-y-2">
							<Label className="font-medium text-sm">
								<Trans>Linked Resume</Trans>
							</Label>
							<Button asChild variant="outline" size="sm">
								<Link to="/builder/$resumeId" params={{ resumeId: application.resumeId }}>
									<Trans>Open in Builder</Trans>
								</Link>
							</Button>
						</div>
					)}

					{application.optimizedResumeId && (
						<div className="space-y-2">
							<Label className="font-medium text-sm">
								<Trans>Optimized Resume</Trans>
							</Label>
							<Button asChild variant="outline" size="sm">
								<Link to="/builder/$resumeId" params={{ resumeId: application.optimizedResumeId }}>
									<Trans>Open Optimized Resume</Trans>
								</Link>
							</Button>
						</div>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
}
