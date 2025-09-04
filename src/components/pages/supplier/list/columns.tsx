import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { SupplierEntity } from "@/domain";
import { convertToLocalDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import {
	ArrowDown,
	ArrowUp,
	ChevronsUpDown,
	Phone,
	PhoneOff,
} from "lucide-react";

export const supplierColumns: ColumnDef<SupplierEntity>[] = [
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
		accessorKey: "supplier_name",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					size='sm'
					className='data-[state=open]:bg-accent -ml-3 h-8'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					<span className='font-bold'>Supplier Name</span>
					{column.getIsSorted() === "desc" ? (
						<ArrowDown />
					) : column.getIsSorted() === "asc" ? (
						<ArrowUp />
					) : (
						<ChevronsUpDown />
					)}
				</Button>
			);
		},
		cell: ({ row }) => (
			<span className='font-medium'>{row.getValue("supplier_name")}</span>
		),
	},
	{
		accessorKey: "supplier_group",
		header: "Supplier Group",
		cell: ({ row }) => (
			<span>
				{row.getValue("supplier_group")
					? row.getValue("supplier_group")
					: "N/A"}
			</span>
		),
	},
	{
		accessorKey: "supplier_type",
		header: ({ column }) => {
			return (
				<Button
					variant={"ghost"}
					size='sm'
					className='hover:bg-transparent data-[state=open]:bg-accent -ml-3 h-8'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					<span className='font-bold'>Supplier Type</span>
					{column.getIsSorted() === "desc" ? (
						<ArrowDown />
					) : column.getIsSorted() === "asc" ? (
						<ArrowUp />
					) : (
						<ChevronsUpDown />
					)}
				</Button>
			);
		},
		cell: ({ row }) => (
			<span>
				{row.getValue("supplier_type") ? row.getValue("supplier_type") : "N/A"}
			</span>
		),
	},
	{
		accessorKey: "mobile_no",
		header: "Mobile Phone",
		cell: ({ row }) => (
			<span>
				{row.getValue("mobile_no") ? (
					<p className='flex items-center'>
						<Phone className='text-primary mr-2 h-4 w-4' />
						<a href={`tel:${row.getValue("mobile_no")}`}>
							{row.getValue("mobile_no")}
						</a>
					</p>
				) : (
					<PhoneOff className='text-destructive h-4 w-4' />
				)}
			</span>
		),
	},
	{
		accessorKey: "modified",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					size='sm'
					className='data-[state=open]:bg-accent -ml-3 h-8'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					<span>Modified</span>
					{column.getIsSorted() === "desc" ? (
						<ArrowDown />
					) : column.getIsSorted() === "asc" ? (
						<ArrowUp />
					) : (
						<ChevronsUpDown />
					)}
				</Button>
			);
		},
		cell: ({ row }) => (
			<div>{convertToLocalDate(row.getValue("modified"))}</div>
		),
	},
];
