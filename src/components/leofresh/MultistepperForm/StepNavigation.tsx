// src/components/multi-step-form/StepNavigation.tsx
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface StepNavigationProps {
	onPrevious: () => void;
	onNext: () => void;
	onSubmit: () => void;
	isFirstStep: boolean;
	isLastStep: boolean;
	isSubmitting: boolean;
	nextButtonText?: string;
	submitButtonText?: string;
	previousButtonText?: string;
}

export function StepNavigation({
	onPrevious,
	onNext,
	onSubmit,
	isFirstStep,
	isLastStep,
	isSubmitting,
	nextButtonText = "Next",
	submitButtonText = "Submit",
	previousButtonText = "Previous",
}: StepNavigationProps) {
	return (
		<div className='flex justify-between pt-6 border-t'>
			<Button
				type='button'
				variant='outline'
				onClick={onPrevious}
				disabled={isFirstStep || isSubmitting}
				className='flex items-center gap-2'>
				<ChevronLeft className='w-4 h-4' />
				{previousButtonText}
			</Button>

			{isLastStep ? (
				<Button
					type='button'
					onClick={onSubmit}
					disabled={isSubmitting}
					className='flex items-center gap-2'>
					{isSubmitting && <Loader2 className='w-4 h-4 animate-spin' />}
					{submitButtonText}
				</Button>
			) : (
				<Button
					type='button'
					onClick={onNext}
					disabled={isSubmitting}
					className='flex items-center gap-2'>
					{nextButtonText}
					<ChevronRight className='w-4 h-4' />
				</Button>
			)}
		</div>
	);
}
