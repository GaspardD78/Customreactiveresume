import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { BriefcaseIcon, PlusIcon } from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { orpc } from "@/integrations/orpc/client";
import type { ApplicationData } from "@/schema/application/data";
import { DashboardHeader } from "../-components/header";
import { ApplicationCard } from "./-components/application-card";

// @ts-expect-error - route not yet in generated route tree
export const Route = createFileRoute("/dashboard/applications/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: applications, refetch } = useQuery(orpc.application.list.queryOptions({ input: {} }));

	const deleteMutation = useMutation(
		orpc.application.delete.mutationOptions({
			onSuccess: () => refetch(),
		}),
	);

	const handleDelete = (id: string) => {
		deleteMutation.mutate({ id });
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<DashboardHeader icon={BriefcaseIcon} title={t`Applications`} />

				<Button asChild size="sm">
					<a href="/dashboard/applications/create">
						<PlusIcon className="size-4" />
						<Trans>New Application</Trans>
					</a>
				</Button>
			</div>

			<Separator />

			{!applications || applications.length === 0 ? (
				<div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
					<BriefcaseIcon className="size-12 text-muted-foreground/50" weight="light" />
					<div>
						<p className="font-medium">
							<Trans>No applications yet</Trans>
						</p>
						<p className="text-muted-foreground text-sm">
							<Trans>Create your first application to start optimizing your resume for a job offer.</Trans>
						</p>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{applications.map((app) => (
						<ApplicationCard key={app.id} id={app.id} data={app.data as ApplicationData} onDelete={handleDelete} />
					))}
				</div>
			)}
		</div>
	);
}
