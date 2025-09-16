import {
	LeofreshFormCheckboxField,
	LeofreshFormField,
	LeoFreshFormSelect,
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

	const { itemsList, rmEnumArr } = useMemo(() => {
		const rmEnumArr = [
			{ label: "Valuation Rate", value: "Valuation Rate" },
			{ label: "Last Purchase Rate", value: "Last Purchase Rate" },
			{ label: "Standard Rate", value: "Standard Rate" },
		];
		if (!manufacturingItems) return { itemsList: [], rmEnumArr: rmEnumArr };

		const itemsList = manufacturingItems.map(item => ({
			label: item.item_code,
			value: item.item_code,
		}));

		return { itemsList, rmEnumArr };
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
			<div className='grid grid-cols-2 gap-4'>
				<LeoFreshFormSelect
					selectItems={rmEnumArr}
					name='rm_cost_as_per'
					control={form.control}
					labelText='BOM Cost'
					description='BOM Cost is based on.'
				/>
				<LeofreshFormField
					control={form.control}
					name='target_warehouse'
					labelText='Target Warehouse'
					placeholder='Enter Target Warehouse'
				/>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<LeofreshFormField
					control={form.control}
					name='uom'
					labelText='UOM'
					placeholder='Enter UOM'
				/>
				<LeofreshFormField
					control={form.control}
					name='quantity'
					labelText='Quantity'
					placeholder='Enter Quantity'
					description={"Quantity to produce per the stock UOM for this item"}
				/>
			</div>

			<div className='flex space-x-4'>
				<LeofreshFormCheckboxField
					control={form.control}
					labelText='Is Active'
					name='is_active'
				/>
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
			</div>
		</div>
	);
}
