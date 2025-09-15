// src/hooks/useMultiStepForm.ts
import { useCallback, useState } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export interface StepConfig<T extends FieldValues> {
	id: string;
	title: string;
	description?: string;
	schema: z.ZodSchema<any>;
	fields: (keyof T)[];
	component: React.ComponentType<{
		form: UseFormReturn<T>;
		onNext: () => void;
		onPrevious: () => void;
		isFirstStep: boolean;
		isLastStep: boolean;
	}>;
}

export interface UseMultiStepFormProps<T extends FieldValues> {
	steps: StepConfig<T>[];
	form: UseFormReturn<T>;
	onSubmit: (data: T) => void | Promise<void>;
}

export function useMultiStepForm<T extends FieldValues>({
	steps,
	form,
	onSubmit,
}: UseMultiStepFormProps<T>) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
	const [isSubmitting, setIsSubmitting] = useState(false);

	const currentStep = steps[currentStepIndex];
	const isFirstStep = currentStepIndex === 0;
	const isLastStep = currentStepIndex === steps.length - 1;

	const goToStep = useCallback(
		(stepIndex: number) => {
			if (stepIndex >= 0 && stepIndex < steps.length) {
				setCurrentStepIndex(stepIndex);
			}
		},
		[steps.length]
	);

	const validateCurrentStep = useCallback(async () => {
		const currentStepFields = currentStep.fields;
		const currentValues: Record<string, any> = {};

		// Extract only current step's field values
		currentStepFields.forEach(field => {
			currentValues[field as string] = form.getValues(field as any);
		});

		try {
			await currentStep.schema.parseAsync(currentValues);
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				error.issues.forEach(issue => {
                    const path = issue.path[0] as keyof T;
                    console.log("Error on form step is", issue);
					form.setError(path as any, {
						type: "validation",
						message: issue.message,
					});
				});
			}
			return false;
		}
	}, [currentStep, form]);

	const nextStep = useCallback(async () => {
		const isValid = await validateCurrentStep();
		if (isValid) {
			setCompletedSteps(prev => new Set([...prev, currentStepIndex]));
			if (!isLastStep) {
				setCurrentStepIndex(prev => prev + 1);
			}
		}
	}, [validateCurrentStep, isLastStep, currentStepIndex]);

	const previousStep = useCallback(() => {
		if (!isFirstStep) {
			setCurrentStepIndex(prev => prev - 1);
		}
	}, [isFirstStep]);

	const handleSubmit = useCallback(async () => {
		const isValid = await validateCurrentStep();
		if (!isValid) return;

		setIsSubmitting(true);
		try {
			const formData = form.getValues();
			await onSubmit(formData);
		} catch (error) {
			console.error("Form submission error:", error);
		} finally {
			setIsSubmitting(false);
		}
	}, [validateCurrentStep, form, onSubmit]);

	return {
		currentStep,
		currentStepIndex,
		isFirstStep,
		isLastStep,
		completedSteps,
		isSubmitting,
		goToStep,
		nextStep,
		previousStep,
		validateCurrentStep,
		handleSubmit,
		totalSteps: steps.length,
	};
}
