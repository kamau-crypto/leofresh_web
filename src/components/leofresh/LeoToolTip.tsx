import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface LeoFreshToolTipProps {
	Trigger: React.ReactNode;
	Content: React.ReactNode;
}

export function LeoFreshToolTip({ Trigger, Content }: LeoFreshToolTipProps) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>{Trigger}</TooltipTrigger>
			<TooltipContent>{Content}</TooltipContent>
		</Tooltip>
	);
}
