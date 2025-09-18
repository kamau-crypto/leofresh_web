import { createSelectionColumn } from "@/components/leofresh";
import type { TabulateWorkOrderEntity } from "@/domain";
import { convertToLocalDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { WorkOrderActions } from "./WorkOrderActions";

export const woColumns: ColumnDef<TabulateWorkOrderEntity>[] = [
	createSelectionColumn(),
	{
		accessorKey: "name",
		header: "Work Order",
		cell: ({ row }) => <span>{row.getValue("name")}</span>,
	},
	{
		accessorKey: "item_name",
		header: "Item Name",
		cell: ({ row }) => <span>{row.getValue("item_name")}</span>,
	},
	{
		accessorKey: "item",
		header: "Item Code",
		cell: ({ row }) => <span>{row.getValue("item")}</span>,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => <span>{row.getValue("status")}</span>,
	},
	{
		accessorKey: "qty",
		header: "Quantity",
		cell: ({ row }) => <span>{row.getValue("qty")}</span>,
	},
	{
		accessorKey: "produced_qty",
		header: "Produced Quantity",
		cell: ({ row }) => <span>{row.getValue("produced_qty")}</span>,
	},
	{
		accessorKey: "fg_warehouse",
		header: "Warehouse",
		cell: ({ row }) => <span>{row.getValue("fg_warehouse")}</span>,
	},
	{
		accessorKey: "modified",
		header: "Modified At",
		cell: ({ row }) => (
			<span>{convertToLocalDate(row.getValue("modified"))}</span>
		),
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const { id, name, status } = row.original;
			return (
				<WorkOrderActions
					id={id}
					name={name}
					status={status}
				/>
			);
		},
	},
];
