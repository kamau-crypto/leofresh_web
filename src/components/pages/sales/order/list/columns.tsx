import { createSelectionColumn } from "@/components/leofresh";
import { PIStatusBadge } from "@/components/leofresh/LeoBadge";
import { Button } from "@/components/ui/button";
import type { SalesOrderListEntity } from "@/domain";
import { formatToLocalCurrency } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

export const salesOrderColumns: ColumnDef<SalesOrderListEntity>[] = [
	createSelectionColumn<SalesOrderListEntity>(),
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					size='sm'
					className='data-[state=open]:bg-accent hover:bg-transparent -ml-3 h-8'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					<span className='font-bold'>Invoice Code</span>
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
			<span className='font-medium'>{row.getValue("name")}</span>
		),
	},
	{
		accessorKey: "customer",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					size='sm'
					className='data-[state=open]:bg-accent -ml-3 h-8 hover:bg-transparent'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					<span className='font-bold'>Customer</span>
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
		accessorKey: "status",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					size='sm'
					className='data-[state=open]:bg-accent -ml-3 h-8 hover:bg-transparent'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					<span className='font-bold'>Status</span>
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
			<span className='font-medium'>
				<PIStatusBadge status={row.getValue("status")} />
			</span>
		),
	},
	{
		accessorKey: "grand_total",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					size='sm'
					className='data-[state=open]:bg-accent -ml-3 h-8 hover:bg-transparent'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					<span className='font-bold'>Grand Total</span>
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
			<span className='font-medium'>
				{formatToLocalCurrency(row.getValue("grand_total"))}
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
					className='data-[state=open]:bg-accent -ml-3 h-8 hover:bg-transparent'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					<span className='font-bold'>Created</span>
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
			<span className='font-medium'>{row.getValue("modified")}</span>
		),
	},
];
