import { LeoFreshBadge } from "@/components/leofresh/LeoBadge";
import { Checkbox } from "@/components/ui/checkbox";
import type { ListItemsEntity } from "@/domain";
import { formatToLocalCurrency } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";

export const itemColumns: ColumnDef<ListItemsEntity>[] = [
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
	{
		accessorKey: "item_name",
		header: "Item Name",
		cell: ({ row }) => (
			<div className='font-medium'>{row.getValue("item_name")}</div>
		),
	},
	{
		accessorKey: "image",
		header: "Item Image",
		cell: ({ row }) => (
			<div>
				<img
					className='w-20 h-20 object-contain rounded-md'
					src={row.getValue("image")}
					alt={row.getValue("item_name")}
				/>
			</div>
		),
	},
	{
		accessorKey: "buyingPrice",
		header: "Standard Buying Price",
		cell: ({ row }) => (
			<div>
				{formatToLocalCurrency(row.getValue("buyingPrice") ?? 0) +
					" per " +
					row.getValue("buyingUom")}
			</div>
		),
	},
	{
		accessorKey: "sellingPrice",
		header: "Standard Selling Price",
		cell: ({ row }) => (
			<div>
				{formatToLocalCurrency(row.getValue("sellingPrice") ?? 0) +
					" per " +
					row.getValue("sellingUom")}
			</div>
		),
	},
	{
		accessorKey: "item_tax_template",
		header: "VAT",
		cell: ({ row }) => {
			const variants: Record<string, string> = {
				set: "success",
				notSet: "warning",
			};
			return (
				<LeoFreshBadge
					variant={
						row.getValue("item_tax_template") ? variants.set : variants.notSet
					}>
					{row.getValue("item_tax_template") ? "Set" : "Not Set"}
				</LeoFreshBadge>
			);
		},
	},
];
