import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import {
	BriefcaseIcon,
	ChartBarIcon,
	CloudArrowUpIcon,
	CopyIcon,
	CurrencyDollarIcon,
	EnvelopeSimpleIcon,
	FilesIcon,
	GlobeIcon,
	type Icon,
	ListChecksIcon,
	LockSimpleIcon,
	MagnifyingGlassIcon,
	PaletteIcon,
	ShieldCheckIcon,
	SparkleIcon,
	TranslateIcon,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { cn } from "@/utils/style";

type Feature = {
	id: string;
	icon: Icon;
	title: string;
	description: string;
};

type FeatureCardProps = Feature & {
	index: number;
};

const getFeatures = (): Feature[] => [
	{
		id: "ats-scoring",
		icon: ChartBarIcon,
		title: t`ATS Scoring`,
		description: t`Get a detailed optimization score (0-100) for each job offer based on keyword match, structure and completeness.`,
	},
	{
		id: "job-parsing",
		icon: MagnifyingGlassIcon,
		title: t`Job Offer Parsing`,
		description: t`Paste any job offer text and AI automatically extracts title, company, required skills, nice-to-have and more.`,
	},
	{
		id: "cover-letter",
		icon: EnvelopeSimpleIcon,
		title: t`Cover Letter Generation`,
		description: t`Generate personalized cover letters with a natural, human tone tailored to each job offer.`,
	},
	{
		id: "optimized-cv",
		icon: CopyIcon,
		title: t`Optimized Resume Fork`,
		description: t`Duplicate your resume in one click and adapt it for a specific job offer following AI suggestions.`,
	},
	{
		id: "application-tracking",
		icon: BriefcaseIcon,
		title: t`Application Tracking`,
		description: t`Manage all your applications in one place with status tracking, history, contacts and notes.`,
	},
	{
		id: "suggestions",
		icon: SparkleIcon,
		title: t`Block-by-Block Suggestions`,
		description: t`AI analyzes each section of your resume and proposes specific reformulations with original vs. proposed text.`,
	},
	{
		id: "keyword-analysis",
		icon: ListChecksIcon,
		title: t`Keyword Analysis`,
		description: t`See which keywords from the job offer are found in your resume, which are missing and their synonyms.`,
	},
	{
		id: "free",
		icon: CurrencyDollarIcon,
		title: t`Free & Open Source`,
		description: t`Completely free, forever. No hidden costs, no premium tiers, no tracking.`,
	},
	{
		id: "unlimited-resumes",
		icon: FilesIcon,
		title: t`Unlimited Resumes`,
		description: t`Create as many resumes as you want, without any limits.`,
	},
	{
		id: "design",
		icon: PaletteIcon,
		title: t`12+ Templates`,
		description: t`Beautiful templates to choose from. Customize colors, fonts, spacing and even write custom CSS.`,
	},
	{
		id: "languages",
		icon: TranslateIcon,
		title: t`Multilingual`,
		description: t`Available in multiple languages. Switch anytime from the language selector.`,
	},
	{
		id: "privacy",
		icon: ShieldCheckIcon,
		title: t`Privacy First`,
		description: t`Your data is secure, never shared. AI keys stay in your browser. Self-host for full control.`,
	},
	{
		id: "public",
		icon: GlobeIcon,
		title: t`Shareable Links`,
		description: t`Share your resume with a public URL or protect it with a password.`,
	},
	{
		id: "self-host",
		icon: CloudArrowUpIcon,
		title: t`Self-Host with Docker`,
		description: t`Deploy on your own servers using the Docker image for complete data ownership.`,
	},
	{
		id: "password-protection",
		icon: LockSimpleIcon,
		title: t`Password Protection`,
		description: t`Protect your resume with a password and control who can view it.`,
	},
];

function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
	return (
		<motion.div
			className={cn(
				"group relative flex min-h-48 flex-col gap-4 overflow-hidden border-b bg-background p-6 transition-[background-color] duration-300",
				"not-nth-[2n]:border-r xl:not-nth-[4n]:border-r",
				"hover:bg-secondary/30",
			)}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.1 }}
			transition={{ duration: 0.4, delay: index * 0.03, ease: "easeOut" }}
		>
			{/* Hover gradient overlay */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			/>

			{/* Icon */}
			<div aria-hidden="true" className="relative">
				<div className="inline-flex rounded-lg bg-primary/5 p-2.5 text-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
					<Icon size={24} weight="thin" />
				</div>
			</div>

			{/* Content */}
			<div className="relative flex flex-col gap-y-1.5">
				<h3 className="font-semibold text-base tracking-tight transition-colors group-hover:text-primary">{title}</h3>
				<p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
			</div>
		</motion.div>
	);
}

export function Features() {
	return (
		<section id="features">
			{/* Header */}
			<motion.div
				className="space-y-4 p-4 md:p-8 xl:py-16"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<h2 className="font-semibold text-2xl tracking-tight md:text-4xl xl:text-5xl">
					<Trans>Features</Trans>
				</h2>

				<p className="max-w-2xl text-muted-foreground leading-relaxed">
					<Trans>
						Everything you need to create professional resumes and optimize them for each job application. AI-powered
						analysis, ATS scoring, and cover letter generation included.
					</Trans>
				</p>
			</motion.div>

			{/* Features Grid */}
			<div className="grid grid-cols-1 xs:grid-cols-2 border-t xl:grid-cols-4">
				{getFeatures().map((feature, index) => (
					<FeatureCard key={feature.id} {...feature} index={index} />
				))}
			</div>
		</section>
	);
}
