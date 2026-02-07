import { Trans } from "@lingui/react/macro";
import { match } from "ts-pattern";
import { Badge } from "@/components/ui/badge";
import type { ApplicationStatus } from "@/schema/application/data";

type Props = {
	status: ApplicationStatus;
};

const getStatusColor = (status: ApplicationStatus) =>
	match(status)
		.with("draft", () => "bg-muted text-muted-foreground")
		.with("applied", () => "bg-blue-500/15 text-blue-700 dark:text-blue-400")
		.with("interview", () => "bg-amber-500/15 text-amber-700 dark:text-amber-400")
		.with("technical_test", () => "bg-purple-500/15 text-purple-700 dark:text-purple-400")
		.with("offer", () => "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400")
		.with("accepted", () => "bg-green-500/15 text-green-700 dark:text-green-400")
		.with("rejected", () => "bg-red-500/15 text-red-700 dark:text-red-400")
		.with("withdrawn", () => "bg-gray-500/15 text-gray-700 dark:text-gray-400")
		.exhaustive();

const getStatusLabel = (status: ApplicationStatus) =>
	match(status)
		.with("draft", () => <Trans>Draft</Trans>)
		.with("applied", () => <Trans>Applied</Trans>)
		.with("interview", () => <Trans>Interview</Trans>)
		.with("technical_test", () => <Trans>Technical Test</Trans>)
		.with("offer", () => <Trans>Offer</Trans>)
		.with("accepted", () => <Trans>Accepted</Trans>)
		.with("rejected", () => <Trans>Rejected</Trans>)
		.with("withdrawn", () => <Trans>Withdrawn</Trans>)
		.exhaustive();

export function StatusBadge({ status }: Props) {
	return (
		<Badge variant="outline" className={getStatusColor(status)}>
			{getStatusLabel(status)}
		</Badge>
	);
}
