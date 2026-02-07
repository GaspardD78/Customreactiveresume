import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { CaretRightIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/utils/style";

type FAQItemData = {
	question: string;
	answer: React.ReactNode;
};

const getFaqItems = (): FAQItemData[] => [
	{
		question: t`Is Reactive Resume Optimiser free?`,
		answer: t`Yes, completely free with no hidden costs or premium tiers. The application is open-source and will always remain free.`,
	},
	{
		question: t`How does the ATS score work?`,
		answer: t`The AI compares your resume against the job offer. The score (0-100) is based on keyword match (50%), resume structure (25%) and information completeness (25%). You also get detailed suggestions to improve each section.`,
	},
	{
		question: t`Which AI providers are supported?`,
		answer: t`You can use OpenAI, Anthropic, Google Gemini, Groq (free tier available) or Ollama for fully local and private analysis. Your API key stays in your browser and is never stored on our servers.`,
	},
	{
		question: t`Can the AI-generated cover letters be detected?`,
		answer: t`Our prompts are specifically designed with anti-detection techniques: varied sentence structures, natural vocabulary, no generic AI-detectable phrases. The result reads like a human-written letter.`,
	},
	{
		question: t`How is my data protected?`,
		answer: t`Your data is stored securely and never shared with third parties. AI API keys remain in your browser. You can also self-host the entire application on your own servers with Docker.`,
	},
	{
		question: t`Can I optimize the same resume for multiple offers?`,
		answer: t`Yes. You can create an optimized fork of your resume for each job application. Each fork is independent and can be edited separately in the builder.`,
	},
	{
		question: t`Can I export my resume to PDF?`,
		answer: t`Yes, you can export your resume to PDF with a single click. The exported PDF preserves all your formatting and styling.`,
	},
];

export function FAQ() {
	const faqItems = getFaqItems();

	return (
		<section
			id="frequently-asked-questions"
			className="flex flex-col gap-x-16 gap-y-6 p-4 md:p-8 lg:flex-row lg:gap-x-18 xl:py-16"
		>
			<motion.h2
				className={cn(
					"flex-1 font-semibold text-2xl tracking-tight md:text-4xl xl:text-5xl",
					"flex shrink-0 flex-wrap items-center gap-x-1.5 lg:flex-col lg:items-start",
				)}
				initial={{ opacity: 0, x: -20 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<Trans context="Every word needs to be wrapped in a tag">
					<span>Frequently</span>
					<span>Asked</span>
					<span>Questions</span>
				</Trans>
			</motion.h2>

			<motion.div
				className="max-w-2xl flex-2 lg:ml-auto 2xl:max-w-3xl"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.1 }}
			>
				<Accordion type="multiple">
					{faqItems.map((item, index) => (
						<FAQItemComponent key={item.question} item={item} index={index} />
					))}
				</Accordion>
			</motion.div>
		</section>
	);
}

type FAQItemComponentProps = {
	item: FAQItemData;
	index: number;
};

function FAQItemComponent({ item, index }: FAQItemComponentProps) {
	return (
		<motion.div
			className="last:border-b"
			initial={{ opacity: 0, y: 10 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.4, delay: index * 0.05 }}
		>
			<AccordionItem value={item.question} className="group border-t">
				<AccordionTrigger className="py-5">
					{item.question}
					<CaretRightIcon aria-hidden="true" className="shrink-0 transition-transform duration-200" />
				</AccordionTrigger>
				<AccordionContent className="pb-5 text-muted-foreground leading-relaxed">{item.answer}</AccordionContent>
			</AccordionItem>
		</motion.div>
	);
}
