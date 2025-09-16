import {
	LeofreshFormCheckboxField,
	LeofreshFormField,
	LeoFreshToolTip,
} from "@/components/leofresh";
import { LeoFreshFormCombobox } from "@/components/leofresh/LeoFreshFormComboBox";
import { useAppSelector } from "@/hooks/appHooks";
import { useEffect, useMemo } from "react";
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

	useEffect(() => {
		const subscribe = form.watch((value, { name }) => {
			if (name === "item_name" && value.item_name) {
				const selectedItem = manufacturingItems!.find(
					item => item.item_code === value.item_name
				);
				if (selectedItem) {
					form.setValue("uom", selectedItem.stock_uom);
				}
			}
		});
		return () => subscribe.unsubscribe();
	}, [form.watch("item_name"), manufacturingItems]);

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

			<LeofreshFormField
				control={form.control}
				name='description'
				labelText='Description'
				placeholder='Enter Description'
			/>

			{/* <FormField
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
			/> */}

			<div className='grid grid-cols-2 gap-4'>
				<LeofreshFormField
					control={form.control}
					name='uom'
					labelText='UOM'
					placeholder='Enter UOM'
				/>
				{/* <FormField
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
				/> */}
				<LeofreshFormField
					control={form.control}
					name='quantity'
					labelText='Quantity'
					placeholder='Enter Quantity'
					description= {"Quantity to produce per the stock UOM for this item"}
				/>
			</div>

			<div className='flex space-x-4'>
				<LeofreshFormCheckboxField
					control={form.control}
					labelText='Is Active'
					name='is_active'
				/>
				{/* <FormField
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
				/> */}
				<LeoFreshToolTip
					Content={<p>This checkbox indicates whether the item is active.</p>}
					Trigger={
						<LeofreshFormCheckboxField
							name='is_default'
							control={form.control}
							labelText='Is Default'
						/>
					}
				/>
				{/* <FormField
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
				/> */}
			</div>
		</div>
	);
}
