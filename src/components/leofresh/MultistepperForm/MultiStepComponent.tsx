// src/components/multi-step-form/MultiStepForm.tsx
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { type StepConfig, useMultiStepForm } from "./hooks";
import { StepIndicator } from "./StepIndicator";
import { StepNavigation } from "./StepNavigation";

interface MultiStepFormProps<T extends FieldValues> {
	form: UseFormReturn<T>;
	steps: StepConfig<T>[];
	onSubmit: (data: T) => void | Promise<void>;
	title?: string;
	description?: string;
	allowStepNavigation?: boolean;
	className?: string;
}

export function MultiStepForm<T extends FieldValues>({
	form,
	steps,
	onSubmit,
	title,
	description,
	allowStepNavigation = false,
	className,
}: MultiStepFormProps<T>) {
	const {
		currentStep,
		currentStepIndex,
		isFirstStep,
		isLastStep,
		completedSteps,
		isSubmitting,
		goToStep,
		nextStep,
		previousStep,
		handleSubmit,
	} = useMultiStepForm({
		steps,
		form,
		onSubmit,
	});

	const CurrentStepComponent = currentStep.component;

	return (
		<Card className={className}>
			{(title || description) && (
				<CardHeader>
					{title && <CardTitle>{title}</CardTitle>}
					{description && <CardDescription>{description}</CardDescription>}
				</CardHeader>
			)}

			<CardContent className='space-y-6'>
				<StepIndicator
					steps={steps.map(step => ({ id: step.id, title: step.title }))}
					currentStepIndex={currentStepIndex}
					completedSteps={completedSteps}
					onStepClick={goToStep}
					allowNavigation={allowStepNavigation}
				/>

				<div className='min-h-[400px]'>
					<div className='mb-6'>
						<h3 className='text-lg font-semibold'>{currentStep.title}</h3>
						{currentStep.description && (
							<p className='text-sm text-muted-foreground mt-1'>
								{currentStep.description}
							</p>
						)}
					</div>

					<Form {...form}>
						<CurrentStepComponent
							form={form}
							onNext={nextStep}
							onPrevious={previousStep}
							isFirstStep={isFirstStep}
							isLastStep={isLastStep}
						/>
					</Form>
				</div>

				<StepNavigation
					onPrevious={previousStep}
					onNext={nextStep}
					onSubmit={handleSubmit}
					isFirstStep={isFirstStep}
					isLastStep={isLastStep}
					isSubmitting={isSubmitting}
				/>
			</CardContent>
		</Card>
	);
}
