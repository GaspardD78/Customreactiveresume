import { Trans } from "@lingui/react/macro";
import { motion } from "motion/react";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Copyright } from "@/components/ui/copyright";

export function Footer() {
	return (
		<motion.footer
			id="footer"
			className="p-4 pb-8 md:p-8 md:pb-12"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
		>
			<div className="flex flex-col items-center gap-4 text-center">
				<BrandIcon variant="logo" className="size-10" />
				<h2 className="font-bold text-lg tracking-tight">Reactive Resume Optimiser</h2>
				<p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
					<Trans>A free and open-source resume builder powered by AI to optimize your job applications.</Trans>
				</p>
				<Copyright />
			</div>
		</motion.footer>
	);
}
