import { Checkbox } from "@/components/ui/checkbox";
import type { PurchaseInvoiceEntity } from "@/domain";
import type { ColumnDef } from "@tanstack/react-table";

export const pInvoiceColums: ColumnDef<PurchaseInvoiceEntity>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
	},
];
