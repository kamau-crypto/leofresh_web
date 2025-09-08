import { createSelectionColumn } from "@/components/leofresh";
import { PIStatusBadge } from "@/components/leofresh/LeoBadge";
import { Button } from "@/components/ui/button";
import type { SalesInvoiceListEntity } from "@/domain";
import { convertToLocalDate, formatToLocalCurrency } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

export const salesInvoiceColumns: ColumnDef<SalesInvoiceListEntity>[] = [
	createSelectionColumn(),
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
					<span className='font-bold'>Shop</span>
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
			<span className='font-medium'>{row.getValue("customer")}</span>
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
		accessorKey: "mpesa_amount",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					size='sm'
					className='data-[state=open]:bg-accent -ml-3 h-8 hover:bg-transparent'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					<span className='font-bold'>Mpesa Amount</span>
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
				{formatToLocalCurrency(row.getValue("mpesa_amount"))}
			</span>
		),
	},
	{
		accessorKey: "cash_amount",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					size='sm'
					className='data-[state=open]:bg-accent -ml-3 h-8 hover:bg-transparent'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					<span className='font-bold'>Cash Amount</span>
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
				{formatToLocalCurrency(row.getValue("cash_amount"))}
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
		accessorKey: "posting_date",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					size='sm'
					className='data-[state=open]:bg-accent -ml-3 h-8 hover:bg-transparent'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					<span className='font-bold'>Date Posted</span>
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
				{convertToLocalDate(row.getValue("posting_date"))}
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
					<span className='font-bold'>Date Modified</span>
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
				{convertToLocalDate(row.getValue("modified"))}
			</span>
		),
	},
];
