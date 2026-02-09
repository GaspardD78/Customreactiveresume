import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { BriefcaseIcon, MagicWandIcon, SparkleIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
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
	const [parseError, setParseError] = useState<string | null>(null);

	const { data: resumes } = useQuery(orpc.resume.list.queryOptions({ input: {} }));

	const createMutation = useMutation(
		orpc.application.create.mutationOptions({
			onSuccess: (result) => {
				navigate({
					to: "/dashboard/applications/$applicationId" as string,
					// biome-ignore lint/suspicious/noExplicitAny: route not yet in generated route tree
					params: { applicationId: result.id } as any,
				});
			},
		}),
	);

	const handleParseWithAI = async () => {
		if (!rawText.trim() || !aiStore.enabled) return;
		setIsParsing(true);
		setParseError(null);

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
			const message = error instanceof Error ? error.message : String(error);
			setParseError(message);
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
				{parseError && (
					<div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-700 text-sm dark:text-red-400">
						<WarningCircleIcon className="mt-0.5 size-4 shrink-0" />
						<div>
							<p className="font-medium">
								<Trans>AI parsing failed</Trans>
							</p>
							<p className="mt-0.5 text-xs opacity-80">{parseError}</p>
							<p className="mt-1 text-xs">
								<Trans>You can fill in the fields manually below.</Trans>
							</p>
						</div>
					</div>
				)}
			</div>

			{/* Step 2: Application details (always editable) */}
			<div className="space-y-3">
				<Label className="font-medium text-base">
					<Trans>Step 2: Application details</Trans>
				</Label>

				{isParsed && (
					<div className="flex items-center gap-2 text-green-700 text-sm dark:text-green-400">
						<MagicWandIcon className="size-4" />
						<Trans>Fields pre-filled by AI. You can edit them.</Trans>
					</div>
				)}

				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-1">
						<Label className="text-muted-foreground text-xs">
							<Trans>Position</Trans>
						</Label>
						<Input
							value={jobOffer.title}
							onChange={(e) => setJobOffer((prev) => ({ ...prev, title: e.target.value }))}
							placeholder={t`e.g., Senior Developer`}
						/>
					</div>
					<div className="space-y-1">
						<Label className="text-muted-foreground text-xs">
							<Trans>Company</Trans>
						</Label>
						<Input
							value={jobOffer.company}
							onChange={(e) => setJobOffer((prev) => ({ ...prev, company: e.target.value }))}
							placeholder={t`e.g., Acme Corp`}
						/>
					</div>
					<div className="space-y-1">
						<Label className="text-muted-foreground text-xs">
							<Trans>Location</Trans>
						</Label>
						<Input
							value={jobOffer.location ?? ""}
							onChange={(e) => setJobOffer((prev) => ({ ...prev, location: e.target.value || null }))}
							placeholder={t`e.g., Paris, France`}
						/>
					</div>
					<div className="space-y-1">
						<Label className="text-muted-foreground text-xs">
							<Trans>Contract Type</Trans>
						</Label>
						<Input
							value={jobOffer.contractType ?? ""}
							onChange={(e) => setJobOffer((prev) => ({ ...prev, contractType: e.target.value || null }))}
							placeholder={t`e.g., CDI, CDD, Freelance`}
						/>
					</div>
					<div className="space-y-1">
						<Label className="text-muted-foreground text-xs">
							<Trans>Salary</Trans>
						</Label>
						<Input
							value={jobOffer.salary ?? ""}
							onChange={(e) => setJobOffer((prev) => ({ ...prev, salary: e.target.value || null }))}
							placeholder={t`e.g., 50-60k`}
						/>
					</div>
				</div>

				{isParsed && jobOffer.hardSkills.length > 0 && (
					<div className="space-y-1">
						<Label className="text-muted-foreground text-xs">
							<Trans>Skills</Trans>
						</Label>
						<p className="text-sm">{jobOffer.hardSkills.join(", ")}</p>
					</div>
				)}
			</div>

			{/* Step 3: Link a resume */}
			<div className="space-y-3">
				<Label className="font-medium text-base">
					<Trans>Step 3: Link a resume</Trans>
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
				<Button variant="outline" onClick={() => navigate({ to: "/dashboard/applications" as string })}>
					<Trans>Cancel</Trans>
				</Button>
				<Button onClick={handleCreate} disabled={createMutation.isPending || (!jobOffer.title && !jobOffer.company)}>
					<BriefcaseIcon className="size-4" />
					<Trans>Create Application</Trans>
				</Button>
			</div>
		</div>
	);
}
