import { cn } from "@/utils/style";

type Props = {
	score: number;
	size?: "sm" | "md" | "lg";
	className?: string;
};

const getScoreColor = (score: number) => {
	if (score >= 80) return "text-green-500";
	if (score >= 60) return "text-amber-500";
	if (score >= 40) return "text-orange-500";
	return "text-red-500";
};

const getTrackColor = (score: number) => {
	if (score >= 80) return "stroke-green-500/20";
	if (score >= 60) return "stroke-amber-500/20";
	if (score >= 40) return "stroke-orange-500/20";
	return "stroke-red-500/20";
};

const getStrokeColor = (score: number) => {
	if (score >= 80) return "stroke-green-500";
	if (score >= 60) return "stroke-amber-500";
	if (score >= 40) return "stroke-orange-500";
	return "stroke-red-500";
};

const sizeMap = {
	sm: { size: 48, strokeWidth: 4, fontSize: "text-xs" },
	md: { size: 64, strokeWidth: 5, fontSize: "text-sm" },
	lg: { size: 96, strokeWidth: 6, fontSize: "text-xl" },
};

export function AtsScoreGauge({ score, size = "md", className }: Props) {
	const { size: svgSize, strokeWidth, fontSize } = sizeMap[size];
	const radius = (svgSize - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (score / 100) * circumference;

	return (
		<div className={cn("relative inline-flex items-center justify-center", className)}>
			<svg width={svgSize} height={svgSize} className="-rotate-90">
				<circle
					cx={svgSize / 2}
					cy={svgSize / 2}
					r={radius}
					fill="none"
					strokeWidth={strokeWidth}
					className={getTrackColor(score)}
				/>
				<circle
					cx={svgSize / 2}
					cy={svgSize / 2}
					r={radius}
					fill="none"
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					className={cn("transition-all duration-500", getStrokeColor(score))}
				/>
			</svg>
			<span className={cn("absolute font-semibold", fontSize, getScoreColor(score))}>{score}</span>
		</div>
	);
}
