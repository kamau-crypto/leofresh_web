import { LeoFreshTable } from "@/components/leofresh/LeoFreshTable";
import { useAppSelector } from "@/hooks/appHooks";
import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";

interface ItemsStepProps {
	form: UseFormReturn<any>;
	onNext: () => void;
	onPrevious: () => void;
	isFirstStep: boolean;
	isLastStep: boolean;
}

export function ItemsStep({ form }: ItemsStepProps) {
	const columns = [
		{
			id: "item_code",
			header: "Item Code",
			accessorKey: "item_code" as const,
			type: "text" as const,
			required: true,
			placeholder: "Enter item code",
		},
		{
			id: "qty",
			header: "Quantity",
			accessorKey: "qty" as const,
			type: "number" as const,
			required: true,
			placeholder: "Enter quantity",
		},
		{
			id: "rate",
			header: "Rate",
			accessorKey: "rate" as const,
			type: "number" as const,
			required: true,
			placeholder: "Enter rate",
		},
		{
			id: "uom",
			header: "UOM",
			accessorKey: "uom" as const,
			type: "text" as const,
			required: true,
			placeholder: "Enter UOM",
		},
	];
	const { manufacturingItems } = useAppSelector(
		state => state.manufacturingItems
	);

	const defaultValues = useMemo(() => {
		if (!manufacturingItems) {
			return {
				item_code: "",
				qty: 1,
				rate: 0,
				uom: "piece",
			};
		}
		const filteredItems = manufacturingItems.filter(
			item => item.item_code === form.getValues("item_name")
		);

		const itemTable = filteredItems.flatMap(item => {
			return item.production_items.map(prodItem => ({
				item_code: prodItem.item_name,
				qty: prodItem.qty,
				rate: item.standard_buying_uom || 0,
				uom: item.stock_uom,
			}));
		});
		form.setValue("items", itemTable);
	}, [manufacturingItems]);

	return (
		<div className='space-y-4'>
			<LeoFreshTable
				form={form}
				name='items'
				columns={columns}
				addButtonText='Add Item'
				defaultValues={defaultValues}
				minRows={1}
			/>
		</div>
	);
}
