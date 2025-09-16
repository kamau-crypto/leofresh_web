// src/components/pages/bom/form/ReviewStep.tsx
import { LeoFreshCard, LeofreshFormField } from "@/components/leofresh";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { AlertCircle, CheckCircle } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface ReviewStepProps {
	form: UseFormReturn<any>;
	onNext: () => void;
	onPrevious: () => void;
	isFirstStep: boolean;
	isLastStep: boolean;
}

export function ReviewStep({ form }: ReviewStepProps) {
	const formData = form.watch();
	const { item_name, uom, items } = formData;

	const totalItems = items ? items.length : 0;
	const totalProductionCost = items.reduce((acc: number, item: any) => {
		const itemTotal = (item.rate || 0) * (item.qty || 0);
		return acc + itemTotal;
	}, 0);
	return (
		<div className='space-y-6'>
			<Card>
				<CardHeader>
					<CardTitle>Final Notes & Submission</CardTitle>
					<CardDescription>
						Add any additional notes and configure submission options
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<FormField
						control={form.control}
						name='notes'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Additional Notes (Optional)</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Add any additional notes about this BOM...'
										className='min-h-[100px]'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='submit_on_creation'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>Submit BOM immediately after creation</FormLabel>
									<p className='text-sm text-muted-foreground'>
										If checked, the BOM will be submitted for approval
										immediately. Otherwise, it will be saved as a draft.
									</p>
								</div>
							</FormItem>
						)}
					/>

					{/* Validation Warnings */}
					<div className='space-y-2'>
						{totalItems === 0 && (
							<div className='flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md'>
								<AlertCircle className='h-4 w-4 text-yellow-600' />
								<p className='text-sm text-yellow-800'>
									Warning: No items have been added to this BOM
								</p>
							</div>
						)}

						{!item_name && (
							<div className='flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md'>
								<AlertCircle className='h-4 w-4 text-red-600' />
								<p className='text-sm text-red-800'>
									Error: Item name is required
								</p>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
			<Card className='elevation-md'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<CheckCircle className='h-5 w-5' />
						Pre-submission Checklist
					</CardTitle>
				</CardHeader>
				<CardContent className='grid grid-cols-2 gap-4'>
					<LeofreshFormField
						name='process_loss_percentage'
						labelText='Process Loss Percentage (%)'
						control={form.control}
						placeholder='Enter process loss percentage'
					/>
					<LeofreshFormField
						name='process_loss_qty'
						labelText='Process Loss Quantity'
						control={form.control}
						placeholder='Enter process loss quantity'
					/>
				</CardContent>
			</Card>
			{/* Pre-submission Checklist */}
			<Card>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<CheckCircle className='h-5 w-5' />
						Pre-submission Checklist
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='space-y-3'>
						<div className='flex items-center gap-3'>
							<div
								className={`w-4 h-4 rounded-full ${item_name ? "bg-green-500" : "bg-gray-300"}`}
							/>
							<span className={item_name ? "text-green-700" : "text-gray-500"}>
								Item name is provided
							</span>
						</div>

						<div className='flex items-center gap-3'>
							<div
								className={`w-4 h-4 rounded-full ${uom ? "bg-green-500" : "bg-gray-300"}`}
							/>
							<span className={uom ? "text-green-700" : "text-gray-500"}>
								Unit of Measure (UOM) is specified
							</span>
						</div>

						<div className='flex items-center gap-3'>
							<div
								className={`w-4 h-4 rounded-full ${totalItems > 0 ? "bg-green-500" : "bg-gray-300"}`}
							/>
							<span
								className={totalItems > 0 ? "text-green-700" : "text-gray-500"}>
								At least one item is added
							</span>
						</div>

						<div className='flex items-center gap-3'>
							<div
								className={`w-4 h-4 rounded-full ${items.every((item: any) => item.item_code && item.qty > 0) ? "bg-green-500" : "bg-gray-300"}`}
							/>
							<span
								className={
									items.every((item: any) => item.item_code && item.qty > 0)
										? "text-green-700"
										: "text-gray-500"
								}>
								All items have valid codes and quantities
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
			<LeoFreshCard
				title='Total Cost'
				content={<div>Total Production Cost: {totalProductionCost}</div>}
			/>
		</div>
	);
}
