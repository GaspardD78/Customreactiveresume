import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { BriefcaseIcon, MagicWandIcon, SparkleIcon } from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAIStore } from "@/integrations/ai/store";
import { orpc } from "@/integrations/orpc/client";
import { defaultApplicationData } from "@/schema/application/data";
import type { JobOffer } from "@/schema/application/job-offer";
import { defaultJobOffer } from "@/schema/application/job-offer";
import { DashboardHeader } from "../-components/header";

export const Route = createFileRoute("/dashboard/applications/create")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const aiStore = useAIStore();

	const [rawText, setRawText] = useState("");
	const [jobOffer, setJobOffer] = useState<JobOffer>(defaultJobOffer);
	const [selectedResumeId, setSelectedResumeId] = useState<string>("");
	const [isParsing, setIsParsing] = useState(false);
	const [isParsed, setIsParsed] = useState(false);

	const { data: resumes } = useQuery(orpc.resume.list.queryOptions({ input: {} }));

	const createMutation = useMutation(
		orpc.application.create.mutationOptions({
			onSuccess: (result) => {
				navigate({
					to: "/dashboard/applications/$applicationId",
					params: { applicationId: result.id },
				});
			},
		}),
	);

	const handleParseWithAI = async () => {
		if (!rawText.trim() || !aiStore.enabled) return;
		setIsParsing(true);

		try {
			const parsed = await orpc.ai.parseJobOffer.call({
				provider: aiStore.provider,
				model: aiStore.model,
				apiKey: aiStore.apiKey,
				baseURL: aiStore.baseURL,
				rawText,
			});
			setJobOffer({ ...parsed, rawText });
			setIsParsed(true);
		} catch (error) {
			console.error("Failed to parse job offer:", error);
		} finally {
			setIsParsing(false);
		}
	};

	const handleCreate = () => {
		const data = {
			...defaultApplicationData,
			jobOffer: { ...jobOffer, rawText },
			status: "draft" as const,
			statusHistory: [{ status: "draft" as const, date: new Date().toISOString() }],
		};

		createMutation.mutate({
			data,
			resumeId: selectedResumeId || undefined,
		});
	};

	const resumeOptions = (resumes ?? []).map((r) => ({
		value: r.id,
		label: r.name,
	}));

	return (
		<div className="mx-auto max-w-2xl space-y-6">
			<DashboardHeader icon={BriefcaseIcon} title={t`New Application`} />

			<Separator />

			{/* Step 1: Paste job offer text */}
			<div className="space-y-3">
				<Label className="font-medium text-base">
					<Trans>Step 1: Paste the job offer</Trans>
				</Label>
				<Textarea
					rows={10}
					value={rawText}
					onChange={(e) => setRawText(e.target.value)}
					placeholder={t`Paste the full job offer text here...`}
					className="resize-y"
				/>
				{aiStore.enabled && (
					<Button onClick={handleParseWithAI} disabled={!rawText.trim() || isParsing}>
						<SparkleIcon className="size-4" />
						{isParsing ? <Trans>Analyzing...</Trans> : <Trans>Analyze with AI</Trans>}
					</Button>
				)}
				{!aiStore.enabled && (
					<p className="text-muted-foreground text-sm">
						<Trans>Configure an AI provider in Settings to enable automatic parsing.</Trans>
					</p>
				)}
			</div>

			{/* Step 2: Review parsed data */}
			{isParsed && (
				<div className="space-y-3 rounded-lg border bg-card p-4">
					<h3 className="flex items-center gap-2 font-medium">
						<MagicWandIcon className="size-4" />
						<Trans>Extracted Information</Trans>
					</h3>

					<div className="grid grid-cols-2 gap-3 text-sm">
						<div>
							<span className="text-muted-foreground">
								<Trans>Position</Trans>:
							</span>
							<p className="font-medium">{jobOffer.title || "\u2014"}</p>
						</div>
						<div>
							<span className="text-muted-foreground">
								<Trans>Company</Trans>:
							</span>
							<p className="font-medium">{jobOffer.company || "\u2014"}</p>
						</div>
						<div>
							<span className="text-muted-foreground">
								<Trans>Location</Trans>:
							</span>
							<p className="font-medium">{jobOffer.location || "\u2014"}</p>
						</div>
						<div>
							<span className="text-muted-foreground">
								<Trans>Contract</Trans>:
							</span>
							<p className="font-medium">{jobOffer.contractType || "\u2014"}</p>
						</div>
						<div>
							<span className="text-muted-foreground">
								<Trans>Salary</Trans>:
							</span>
							<p className="font-medium">{jobOffer.salary || "\u2014"}</p>
						</div>
						<div>
							<span className="text-muted-foreground">
								<Trans>Skills</Trans>:
							</span>
							<p className="font-medium">{jobOffer.hardSkills?.join(", ") || "\u2014"}</p>
						</div>
					</div>
				</div>
			)}

			{/* Step 3: Link a resume */}
			<div className="space-y-3">
				<Label className="font-medium text-base">
					<Trans>Step 2: Link a resume</Trans>
				</Label>
				<Combobox
					value={selectedResumeId}
					options={resumeOptions}
					onValueChange={(value) => setSelectedResumeId(value ?? "")}
					buttonProps={{
						variant: "outline",
						className: "w-full justify-start",
						children: (_, option) => option?.label ?? t`Select a resume...`,
					}}
				/>
			</div>

			{/* Create button */}
			<div className="flex justify-end gap-3">
				<Button variant="outline" onClick={() => navigate({ to: "/dashboard/applications" })}>
					<Trans>Cancel</Trans>
				</Button>
				<Button onClick={handleCreate} disabled={createMutation.isPending}>
					<BriefcaseIcon className="size-4" />
					<Trans>Create Application</Trans>
				</Button>
			</div>
		</div>
	);
}
