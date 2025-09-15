import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

export type LeoFreshCardProps = {
	title?: string;
	description?: string;
	footer?: string;
	content: React.ReactNode;
	className?: string;
};

export function LeoFreshCard({
	title,
	description,
	footer,
	content,
	className,
}: LeoFreshCardProps) {
	return (
		<Card
			className={cn(
				"shadow-lg shadown-primary/10 rounded-md lg:rounded-lg",
				className
			)}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{content}</CardContent>
			<CardFooter>
				<p>{footer}</p>
			</CardFooter>
		</Card>
	);
}
