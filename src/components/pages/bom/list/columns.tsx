import { createSelectionColumn } from "@/components/leofresh";
import { LeoFreshBadge } from "@/components/leofresh/LeoBadge";
import type { BOMListEntity } from "@/domain";
import { convertToLocalDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { ListChecks, Warehouse } from "lucide-react";
import { BOMActions } from "./BOMActions";

export const BOMListColumns: ColumnDef<BOMListEntity>[] = [
	createSelectionColumn(),
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => (
			<div className='flex items-center'>
				<ListChecks className='w-5 h-5 mr-2' />
				<span>{row.getValue("name")}</span>
			</div>
		),
	},
	{
		accessorKey: "is_active",
		header: "Active",
		cell: ({ row }) => (
			<LeoFreshBadge variant={row.getValue("is_active") ? "success" : "error"}>
				{row.getValue("is_active") ? "Active" : "Inactive"}
			</LeoFreshBadge>
		),
	},
	{
		accessorKey: "is_default",
		header: "Default",
		cell: ({ row }) => (
			<LeoFreshBadge variant={row.getValue("is_default") ? "success" : "error"}>
				{row.getValue("is_default") ? "Yes" : "No"}
			</LeoFreshBadge>
		),
	},
	{
		accessorKey: "default_source_warehouse",
		header: "Warehouse",
		cell: ({ row }) => (
			<span className='flex items-center'>
				<LeoFreshBadge
					variant={
						row.getValue("default_source_warehouse") ===
						row.original.default_target_warehouse
							? "success"
							: "warning"
					}>
					<Warehouse className='mr-2' />
					{row.getValue("default_source_warehouse")}
				</LeoFreshBadge>
			</span>
		),
	},
	{
		accessorKey: "docstatus",
		header: "Status",
		cell: ({ row }) => {
			const label = compileDocStatusText(row.getValue("docstatus"));
			return (
				<span className='flex items-center'>
					<LeoFreshBadge variant={label.variant}>{label.text}</LeoFreshBadge>
				</span>
			);
		},
	},
	{
		accessorKey: "modified",
		header: "Last Modified",
		cell: ({ row }) => (
			<span>{convertToLocalDate(row.getValue("modified"))}</span>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const { id, name, docstatus } = row.original;

			return (
				<BOMActions
					id={id}
					name={name}
					docstatus={docstatus}
				/>
			);
		},
	},
];

function compileDocStatusText(status: number) {
	switch (status) {
		case 0:
			return {
				text: "Draft",
				variant: "error",
				nextSteps: ["Submit", "Delete"],
			};
		case 1:
			return { text: "Submitted", variant: "success", nextSteps: ["Cancel"] };
		case 2:
			return {
				text: "Cancelled",
				variant: "warning",
				nextSteps: ["Amend", "New Version"],
			};
		default:
			return {
				text: "Draft",
				variant: "error",
				nextSteps: ["Submit", "Delete"],
			};
	}
}
