// src/components/pages/bom/form/ReviewStep.tsx
import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { formatToLocalCurrency } from "@/lib/utils";

import {
	AlertCircle,
	Calculator,
	CheckCircle,
	DollarSign,
	FileText,
	Hash,
	Package,
	Scale,
} from "lucide-react";
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
	const {
		item_name,
		description,
		uom,
		quantity,
		is_active,
		is_default,
		items = [],
	} = formData;

	// Calculate totals
	const totalItems = items.length;
	const totalQuantity = items.reduce(
		(sum: number, item: any) => sum + (item.qty || 0),
		0
	);
	const totalValue = items.reduce(
		(sum: number, item: any) => sum + (item.qty || 0) * (item.rate || 0),
		0
	);
	const averageRate = totalQuantity > 0 ? totalValue / totalQuantity : 0;

	return (
		<div className='space-y-6'>
			{/* Summary Cards */}
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
				<Card>
					<CardContent className='p-4'>
						<div className='flex items-center space-x-2'>
							<Package className='h-4 w-4 text-blue-500' />
							<div>
								<p className='text-sm font-medium text-muted-foreground'>
									Total Items
								</p>
								<p className='text-xl font-bold'>{totalItems}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className='p-4'>
						<div className='flex items-center space-x-2'>
							<Calculator className='h-4 w-4 text-green-500' />
							<div>
								<p className='text-sm font-medium text-muted-foreground'>
									Total Qty
								</p>
								<p className='text-xl font-bold'>{Number(totalQuantity).toFixed(3)}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className='p-4'>
						<div className='flex items-center space-x-2'>
							<DollarSign className='h-4 w-4 text-yellow-500' />
							<div>
								<p className='text-sm font-medium text-muted-foreground'>
									Total Value
								</p>
								<p className='text-xl font-bold'>
									{formatToLocalCurrency(totalValue)}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className='p-4'>
						<div className='flex items-center space-x-2'>
							<Scale className='h-4 w-4 text-purple-500' />
							<div>
								<p className='text-sm font-medium text-muted-foreground'>
									Avg. Rate
								</p>
								<p className='text-xl font-bold'>
									{formatToLocalCurrency(averageRate)}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Basic Information Review */}
			<Card>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<FileText className='h-5 w-5' />
						Basic Information
					</CardTitle>
					<CardDescription>
						Review the basic BOM details you've entered
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='text-sm font-medium text-muted-foreground'>
								Item Name
							</label>
							<p className='text-base font-medium'>
								{item_name || "Not specified"}
							</p>
						</div>

						<div>
							<label className='text-sm font-medium text-muted-foreground'>
								UOM
							</label>
							<p className='text-base font-medium'>{uom || "Not specified"}</p>
						</div>

						<div>
							<label className='text-sm font-medium text-muted-foreground'>
								Quantity
							</label>
							<p className='text-base font-medium'>{quantity || 0}</p>
						</div>

						<div>
							<label className='text-sm font-medium text-muted-foreground'>
								Status
							</label>
							<div className='flex gap-2 mt-1'>
								{is_active && (
									<Badge
										variant='secondary'
										className='text-xs'>
										<CheckCircle className='h-3 w-3 mr-1' />
										Active
									</Badge>
								)}
								{is_default && (
									<Badge
										variant='outline'
										className='text-xs'>
										<Hash className='h-3 w-3 mr-1' />
										Default
									</Badge>
								)}
								{!is_active && !is_default && (
									<Badge
										variant='destructive'
										className='text-xs'>
										<AlertCircle className='h-3 w-3 mr-1' />
										Inactive
									</Badge>
								)}
							</div>
						</div>
					</div>

					{description && (
						<div>
							<label className='text-sm font-medium text-muted-foreground'>
								Description
							</label>
							<p className='text-base mt-1 p-3 bg-muted rounded-md'>
								{description}
							</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* BOM Items Review */}
			<Card>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<Package className='h-5 w-5' />
						BOM Items ({totalItems})
					</CardTitle>
					<CardDescription>
						Review all items included in this Bill of Materials
					</CardDescription>
				</CardHeader>
				<CardContent>
					{items.length > 0 ? (
						<div className='space-y-3'>
							{items.map((item: any, index: number) => {
								const itemTotal = (item.qty || 0) * (item.rate || 0);
								return (
									<Card
										key={index}
										className='border-l-4 border-l-primary'>
										<CardContent className='p-4'>
											<div className='grid grid-cols-1 md:grid-cols-5 gap-4 items-center'>
												<div>
													<label className='text-xs font-medium text-muted-foreground'>
														Item Code
													</label>
													<p className='font-medium'>
														{item.item_code || "Not specified"}
													</p>
												</div>

												<div>
													<label className='text-xs font-medium text-muted-foreground'>
														Quantity
													</label>
													<p className='font-medium'>{item.qty || 0}</p>
												</div>

												<div>
													<label className='text-xs font-medium text-muted-foreground'>
														UOM
													</label>
													<p className='font-medium'>
														{item.uom || "Not specified"}
													</p>
												</div>

												<div>
													<label className='text-xs font-medium text-muted-foreground'>
														Rate
													</label>
													<p className='font-medium'>
														{formatToLocalCurrency(item.rate || 0)}
													</p>
												</div>

												<div>
													<label className='text-xs font-medium text-muted-foreground'>
														Total
													</label>
													<p className='font-bold text-primary'>
														{formatToLocalCurrency(itemTotal)}
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
								);
							})}

							<Separator />

							{/* Items Summary */}
							<div className='bg-muted p-4 rounded-lg'>
								<div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-center'>
									<div>
										<p className='text-sm text-muted-foreground'>Total Items</p>
										<p className='text-lg font-bold'>{totalItems}</p>
									</div>
									<div>
										<p className='text-sm text-muted-foreground'>
											Total Quantity
										</p>
										<p className='text-lg font-bold'>
											{Number(totalQuantity).toFixed(3)}
										</p>
									</div>
									<div>
										<p className='text-sm text-muted-foreground'>Total Value</p>
										<p className='text-lg font-bold text-primary'>
											{formatToLocalCurrency(totalValue)}
										</p>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className='text-center py-8'>
							<Package className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
							<p className='text-muted-foreground'>
								No items added to this BOM
							</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Additional Notes and Submit Options */}
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

						{totalValue === 0 && totalItems > 0 && (
							<div className='flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md'>
								<AlertCircle className='h-4 w-4 text-blue-600' />
								<p className='text-sm text-blue-800'>
									Info: Total BOM value is zero. Consider adding rates to your
									items.
								</p>
							</div>
						)}
					</div>
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
		</div>
	);
}
