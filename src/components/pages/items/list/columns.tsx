import { Checkbox } from "@/components/ui/checkbox";
import type { ListItemsEntity } from "@/domain";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ListItemsEntity>[] = [
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
		accessorKey: "item_image",
		header: "Item Image",
		cell: ({ row }) => (
			<div>
				<img
					className='w-50 h-50 object-contain rounded-md'
					src={row.getValue("item_image")}
					alt={row.getValue("item_name")}
				/>
			</div>
		),
    }, {
        accessorKey: "buyingPrice",
        header: "Standard Buying Price",
        cell: ({ row }) => (
            <div>
                {row.getValue("buyingPrice")}
            </div>
        )
    }
];
