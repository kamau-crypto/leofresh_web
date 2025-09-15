import { LeoFreshTable } from "@/components/leofresh/LeoFreshTable";
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

	return (
		<div className='space-y-4'>
			<LeoFreshTable
				form={form}
				name='items'
				columns={columns}
				addButtonText='Add Item'
				defaultValues={{
					item_code: "",
					qty: 1,
					rate: 0,
					uom: "",
				}}
				minRows={1}
			/>
		</div>
	);
}
