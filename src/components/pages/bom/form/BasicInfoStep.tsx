// src/components/pages/bom/create/steps/BasicInfoStep.tsx
import { LeoFreshFormCombobox } from "@/components/leofresh/LeoFreshFormComboBox";
import { Checkbox } from "@/components/ui/checkbox";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/hooks/appHooks";
import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { BasicInfoItems } from "./bom";

interface BasicInfoStepProps {
	form: UseFormReturn<any>;
	onNext: () => void;
	onPrevious: () => void;
	isFirstStep: boolean;
	isLastStep: boolean;
}

export function BasicInfoStep({ form }: BasicInfoStepProps) {
	const { manufacturingItems } = useAppSelector(
		state => state.manufacturingItems
	);

	const itemsList = useMemo(() => {
		if (!manufacturingItems) return [];

		return manufacturingItems.map(item => ({
			label: item.item_code,
			value: item.item_code,
		}));
	}, [manufacturingItems]);

	return (
		<div className='space-y-4'>
			<LeoFreshFormCombobox<BasicInfoItems>
				control={form.control}
				name='item_name'
				options={itemsList}
				placeholder='Select an item to create a BOM'
				label='Item Name'
				required
			/>

			<FormField
				control={form.control}
				name='description'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Description</FormLabel>
						<FormControl>
							<Textarea
								placeholder='Enter description'
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='uom'
					render={({ field }) => (
						<FormItem>
							<FormLabel>UOM *</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select UOM' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='Nos'>Nos</SelectItem>
									<SelectItem value='Kg'>Kg</SelectItem>
									<SelectItem value='Meter'>Meter</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='quantity'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Quantity *</FormLabel>
							<FormControl>
								<Input
									type='number'
									step='0.001'
									placeholder='Enter quantity'
									{...field}
									onChange={e => field.onChange(Number(e.target.value))}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className='flex space-x-4'>
				<FormField
					control={form.control}
					name='is_active'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel>Is Active</FormLabel>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='is_default'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel>Is Default</FormLabel>
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
}
