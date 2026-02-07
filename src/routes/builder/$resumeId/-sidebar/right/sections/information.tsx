import { Trans } from "@lingui/react/macro";
import { SectionBase } from "../shared/section-base";

export function InformationSectionBuilder() {
	return (
		<SectionBase type="information" className="space-y-4">
			<div className="space-y-2 rounded-md border bg-primary/10 p-5">
				<h4 className="font-medium tracking-tight">
					<Trans>Reactive Resume Optimiser</Trans>
				</h4>

				<div className="space-y-2 text-muted-foreground text-xs leading-normal">
					<p>
						<Trans>
							Build and optimize your resume with AI-powered analysis to match job offers and increase your chances of
							success.
						</Trans>
					</p>
				</div>
			</div>
		</SectionBase>
	);
}
