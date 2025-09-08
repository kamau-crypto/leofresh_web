import { PIStatusBadge } from "@/components/leofresh/LeoBadge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { PurchaseReceiptsListEntity } from "@/domain/entities/purchase/purchase.receipt.entity";
import { convertToLocalDate, formatToLocalCurrency } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

export const pReceiptColumns: ColumnDef<PurchaseReceiptsListEntity>[] = [
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
		accessorKey: "supplier",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					size='sm'
					className='data-[state=open]:bg-accent -ml-3 h-8 hover:bg-transparent'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					<span className='font-bold'>Supplier</span>
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
			<span className='font-medium'>{row.getValue("supplier")}</span>
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
					<span className='font-bold'>Modified</span>
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
