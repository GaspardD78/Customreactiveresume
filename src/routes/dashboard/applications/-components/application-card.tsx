import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { BuildingsIcon, CalendarIcon, MapPinIcon, TrashIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { ApplicationData } from "@/schema/application/data";
import { AtsScoreGauge } from "./ats-score-gauge";
import { StatusBadge } from "./status-badge";

type Props = {
	id: string;
	data: ApplicationData;
	onDelete?: (id: string) => void;
};

export function ApplicationCard({ id, data, onDelete }: Props) {
	const { jobOffer, status, atsScore } = data;

	return (
		<div className="group relative flex flex-col rounded-lg border bg-card transition-shadow hover:shadow-md">
			<div className="p-4 pb-2">
				<div className="flex items-start justify-between gap-2">
					<div className="min-w-0 flex-1">
						<h3 className="truncate text-base">
							<Link
								to={"/dashboard/applications/$applicationId" as string}
								// biome-ignore lint/suspicious/noExplicitAny: route not yet in generated route tree
								params={{ applicationId: id } as any}
								className="hover:underline"
							>
								{jobOffer.title || t`Untitled Position`}
							</Link>
						</h3>
						{jobOffer.company && (
							<p className="mt-1 flex items-center gap-1 text-muted-foreground text-sm">
								<BuildingsIcon className="size-3.5 shrink-0" />
								<span className="truncate">{jobOffer.company}</span>
							</p>
						)}
					</div>
					{atsScore && <AtsScoreGauge score={atsScore.overall} size="sm" />}
				</div>
			</div>

			<div className="flex-1 px-4 pb-2">
				<div className="flex flex-wrap gap-2">
					<StatusBadge status={status} />
					{jobOffer.contractType && <span className="text-muted-foreground text-xs">{jobOffer.contractType}</span>}
				</div>

				{jobOffer.location && (
					<p className="mt-2 flex items-center gap-1 text-muted-foreground text-xs">
						<MapPinIcon className="size-3 shrink-0" />
						{jobOffer.location}
					</p>
				)}
			</div>

			<div className="flex items-center justify-between border-t px-4 py-3">
				<div className="flex items-center gap-1 text-muted-foreground text-xs">
					<CalendarIcon className="size-3" />
					{data.appliedAt ? new Date(data.appliedAt).toLocaleDateString() : <Trans>Not applied yet</Trans>}
				</div>

				{onDelete && (
					<Button
						size="icon-sm"
						variant="ghost"
						className="opacity-0 group-hover:opacity-100"
						onClick={(e) => {
							e.preventDefault();
							onDelete(id);
						}}
					>
						<TrashIcon className="size-4" />
					</Button>
				)}
			</div>
		</div>
	);
}
