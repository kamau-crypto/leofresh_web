// src/components/multi-step-form/StepIndicator.tsx
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
	steps: Array<{ id: string; title: string }>;
	currentStepIndex: number;
	completedSteps: Set<number>;
	onStepClick?: (stepIndex: number) => void;
	allowNavigation?: boolean;
}

export function StepIndicator({
	steps,
	currentStepIndex,
	completedSteps,
	onStepClick,
	allowNavigation = false,
}: StepIndicatorProps) {
	return (
		<div className='flex items-center justify-between w-full mb-8'>
			{steps.map((step, index) => {
				const isCompleted = completedSteps.has(index);
				const isCurrent = index === currentStepIndex;
				const isClickable =
					allowNavigation && (isCompleted || index <= currentStepIndex);

				return (
					<div
						key={step.id}
						className='flex items-center flex-1'>
						<div className='flex flex-col items-center'>
							<button
								type='button'
								disabled={!isClickable}
								onClick={() => isClickable && onStepClick?.(index)}
								className={cn(
									"w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors",
									{
										"bg-primary text-primary-foreground": isCurrent,
										"bg-green-500 text-white": isCompleted,
										"bg-muted text-muted-foreground":
											!isCurrent && !isCompleted,
										"cursor-pointer hover:bg-primary/80": isClickable,
										"cursor-not-allowed": !isClickable,
									}
								)}>
								{isCompleted ? (
									<Check className='w-5 h-5' />
								) : (
									<span>{index + 1}</span>
								)}
							</button>
							<span className='mt-2 text-sm font-medium text-center'>
								{step.title}
							</span>
						</div>
						{index < steps.length - 1 && (
							<div
								className={cn("flex-1 h-0.5 mx-4 transition-colors", {
									"bg-green-500": isCompleted,
									"bg-primary": index < currentStepIndex,
									"bg-muted": index >= currentStepIndex,
								})}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}
