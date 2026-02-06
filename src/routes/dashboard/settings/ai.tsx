import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { BrainIcon, CheckCircleIcon, InfoIcon, XCircleIcon } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo } from "react";
import { toast } from "sonner";
import { useIsClient } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { type AIProvider, useAIStore } from "@/integrations/ai/store";
import { orpc } from "@/integrations/orpc/client";
import { cn } from "@/utils/style";
import { DashboardHeader } from "../-components/header";

export const Route = createFileRoute("/dashboard/settings/ai")({
	component: RouteComponent,
});

type ProviderOption = ComboboxOption<AIProvider> & {
	defaultBaseURL: string;
	modelPlaceholder: string;
	requiresApiKey: boolean;
};

const providerOptions: ProviderOption[] = [
	{
		value: "openai",
		label: "OpenAI",
		keywords: ["openai", "gpt", "chatgpt"],
		defaultBaseURL: "https://api.openai.com/v1",
		modelPlaceholder: "gpt-4o, gpt-4o-mini",
		requiresApiKey: true,
	},
	{
		value: "groq",
		label: "Groq",
		keywords: ["groq", "llama", "mixtral", "fast"],
		defaultBaseURL: "https://api.groq.com/openai/v1",
		modelPlaceholder: "llama-3.3-70b-versatile, llama-3.1-8b-instant",
		requiresApiKey: true,
	},
	{
		value: "ollama",
		label: "Ollama (Local)",
		keywords: ["ollama", "ai", "local", "llama", "llama3"],
		defaultBaseURL: "http://localhost:11434",
		modelPlaceholder: "llama3.2, llama3.2:1b, llama3.1",
		requiresApiKey: false,
	},
	{
		value: "anthropic",
		label: "Anthropic Claude",
		keywords: ["anthropic", "claude", "ai"],
		defaultBaseURL: "https://api.anthropic.com/v1",
		modelPlaceholder: "claude-sonnet-4-5-20250929, claude-haiku-4-5-20251001",
		requiresApiKey: true,
	},
	{
		value: "vercel-ai-gateway",
		label: "Vercel AI Gateway",
		keywords: ["vercel", "gateway", "ai"],
		defaultBaseURL: "https://ai-gateway.vercel.sh/v1/ai",
		modelPlaceholder: "openai/gpt-4o, anthropic/claude-sonnet-4-5-20250929",
		requiresApiKey: true,
	},
	{
		value: "gemini",
		label: "Google Gemini",
		keywords: ["gemini", "google", "bard"],
		defaultBaseURL: "https://generativelanguage.googleapis.com/v1beta",
		modelPlaceholder: "gemini-2.0-flash, gemini-1.5-pro",
		requiresApiKey: true,
	},
];

function AIForm() {
	const { set, model, apiKey, baseURL, provider, enabled, testStatus } = useAIStore();

	const selectedOption = useMemo(() => {
		return providerOptions.find((option) => option.value === provider);
	}, [provider]);

	const { mutate: testConnection, isPending: isTesting } = useMutation(orpc.ai.testConnection.mutationOptions());

	const handleProviderChange = (value: AIProvider | null) => {
		if (!value) return;
		const option = providerOptions.find((o) => o.value === value);
		set((draft) => {
			draft.provider = value;
			if (!option?.requiresApiKey) {
				draft.apiKey = "";
			}
		});
	};

	const handleModelChange = (value: string) => {
		set((draft) => {
			draft.model = value;
		});
	};

	const handleApiKeyChange = (value: string) => {
		set((draft) => {
			draft.apiKey = value;
		});
	};

	const handleBaseURLChange = (value: string) => {
		set((draft) => {
			draft.baseURL = value;
		});
	};

	const handleTestConnection = () => {
		testConnection(
			{ provider, model, apiKey, baseURL },
			{
				onSuccess: (data) => {
					set((draft) => {
						draft.testStatus = data ? "success" : "failure";
					});
				},
				onError: (error) => {
					set((draft) => {
						draft.testStatus = "failure";
					});

					toast.error(error.message);
				},
			},
		);
	};

	const isLocalProvider = provider === "ollama";

	return (
		<div className="grid gap-6 sm:grid-cols-2">
			<div className="flex flex-col gap-y-2">
				<Label htmlFor="provider">
					<Trans>Provider</Trans>
				</Label>
				<Combobox
					id="provider"
					value={provider}
					disabled={enabled}
					options={providerOptions}
					onValueChange={handleProviderChange}
				/>
			</div>

			<div className="flex flex-col gap-y-2">
				<Label htmlFor="model">
					<Trans>Model</Trans>
				</Label>
				<Input
					id="model"
					type="text"
					value={model}
					disabled={enabled}
					onChange={(e) => handleModelChange(e.target.value)}
					placeholder={selectedOption?.modelPlaceholder}
				/>
			</div>

			{selectedOption?.requiresApiKey && (
				<div className="flex flex-col gap-y-2 sm:col-span-2">
					<Label htmlFor="api-key">
						<Trans>API Key</Trans>
					</Label>
					<Input
						id="api-key"
						type="password"
						value={apiKey}
						disabled={enabled}
						onChange={(e) => handleApiKeyChange(e.target.value)}
					/>
				</div>
			)}

			<div className="flex flex-col gap-y-2 sm:col-span-2">
				<Label htmlFor="base-url">
					<Trans>Base URL (Optional)</Trans>
				</Label>
				<Input
					id="base-url"
					type="url"
					value={baseURL}
					disabled={enabled}
					placeholder={selectedOption?.defaultBaseURL}
					onChange={(e) => handleBaseURLChange(e.target.value)}
				/>
			</div>

			{isLocalProvider && (
				<div className="flex items-start gap-3 rounded-sm border border-dashed bg-muted/50 p-4 sm:col-span-2">
					<InfoIcon className="mt-0.5 shrink-0 text-muted-foreground" size={18} />
					<div className="text-muted-foreground text-sm leading-relaxed">
						<Trans>
							Ollama runs locally on your machine. Make sure Ollama is running before testing the connection. To use
							Llama 3.2, run: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ollama pull llama3.2</code>
						</Trans>
					</div>
				</div>
			)}

			<div>
				<Button variant="outline" disabled={isTesting || enabled} onClick={handleTestConnection}>
					{isTesting ? (
						<Spinner />
					) : testStatus === "success" ? (
						<CheckCircleIcon className="text-success" />
					) : testStatus === "failure" ? (
						<XCircleIcon className="text-destructive" />
					) : null}
					<Trans>Test Connection</Trans>
				</Button>
			</div>
		</div>
	);
}

function RouteComponent() {
	const isClient = useIsClient();

	const enabled = useAIStore((state) => state.enabled);
	const canEnable = useAIStore((state) => state.canEnable());
	const setEnabled = useAIStore((state) => state.setEnabled);

	if (!isClient) return null;

	return (
		<div className="space-y-4">
			<DashboardHeader icon={BrainIcon} title={t`Artificial Intelligence`} />

			<Separator />

			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="grid max-w-xl gap-6"
			>
				<div className="flex items-start gap-4 rounded-sm border bg-popover p-6">
					<div className="rounded-sm bg-primary/10 p-2.5">
						<InfoIcon className="text-primary" size={24} />
					</div>

					<div className="flex-1 space-y-2">
						<h3 className="font-semibold">
							<Trans>Your data is stored locally</Trans>
						</h3>

						<p className="text-muted-foreground leading-relaxed">
							<Trans>
								Everything entered here is stored locally on your browser. Your data is only sent to the server when
								making a request to the AI provider, and is never stored or logged on our servers.
							</Trans>
						</p>
					</div>
				</div>

				<Separator />

				<div className="flex items-center justify-between">
					<Label htmlFor="enable-ai">
						<Trans>Enable AI Features</Trans>
					</Label>
					<Switch id="enable-ai" checked={enabled} disabled={!canEnable} onCheckedChange={setEnabled} />
				</div>

				<p className={cn("flex items-center gap-x-2", enabled ? "text-success" : "text-destructive")}>
					{enabled ? <CheckCircleIcon /> : <XCircleIcon />}
					{enabled ? <Trans>Enabled</Trans> : <Trans>Disabled</Trans>}
				</p>

				<AIForm />
			</motion.div>
		</div>
	);
}
