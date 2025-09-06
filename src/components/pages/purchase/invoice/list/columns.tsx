"use client";
import { PIStatusBadge } from "@/components/leofresh/LeoBadge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type {
	PurchaseInvoiceEntity,
	PurchaseInvoiceEntityStatus,
} from "@/domain";
import { LeofreshError } from "@/lib/error";
import { formatToLocalCurrency } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import {
	ArrowDown,
	ArrowUp,
	BanknoteArrowUp,
	ChevronsUpDown,
	CircleX,
	CopyIcon,
	Eye,
	Mail,
	MoreHorizontal,
	Printer,
	Send,
	Trash2,
	type LucideProps,
} from "lucide-react";
import toast from "react-hot-toast";

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
		accessorKey: "supplier_name",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					size='sm'
					className='data-[state=open]:bg-accent -ml-3 h-8 hover:bg-transparent'
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
		accessorKey: "posting_date",
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
			<span className='font-medium'>
				{row.getValue("posting_date") + " " + row.original.posting_time}
			</span>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align='end'
						className='px-2'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => {
								navigator.clipboard.writeText(row.original.name);
								toast.success("Copied To Clipboard");
							}}>
							<CopyIcon
								size={16}
								className='text-primary'
							/>
							<p className=''>Copy Name</p>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<span>
								<Eye
									size={16}
									className='text-primary'
								/>
							</span>
							<p className=''>View Details</p>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						{MapNextStatus({
							status: row.original.status as PurchaseInvoiceEntityStatus,
						}).map(action => (
							<DropdownMenuItem
								key={action.status}
								onClick={action.action}>
								<div
									className='flex items-center gap-2'
									onClick={action.action}>
									{action.icon && (
										<action.icon
											size={16}
											className={
												action.status === "Cancel"
													? "text-destructive"
													: "text-slate-700"
											}
										/>
									)}
									<span>
										{action.status === "Amend"
											? "Amend"
											: action.status === "Submit"
												? "Submit"
												: action.status}
									</span>
								</div>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<span>
								<Mail
									size={16}
									className='text-primary'
								/>
							</span>
							<p className=''>Email</p>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<span>
								<Printer
									size={16}
									className='text-primary'
								/>{" "}
							</span>
							<p className=''>Print</p>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

type NextStatusActionProps = {
	status:
		| PurchaseInvoiceEntityStatus
		| "Submit"
		| "Amend"
		| "Delete"
		| "Pay"
		| "Cancel";
	icon?: React.ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
	>;
	action: () => void;
};

function MapNextStatus({
	status,
}: {
	status: PurchaseInvoiceEntityStatus;
}): NextStatusActionProps[] {
	switch (status) {
		case "Draft":
			return [
				{
					status: "Submit",
					action: () => {
						throw new LeofreshError({ message: "Method not implemented" });
					},
					icon: Send,
				},
			];
		case "Cancelled":
			return [
				{
					status: "Amend",
					action: () => {
						throw new LeofreshError({ message: "Method not implemented" });
					},
				},
				{
					status: "Delete",
					action: () => {
						throw new LeofreshError({ message: "Method not implemented" });
					},
					icon: Trash2,
				},
			];
		case "Unpaid":
			return [
				{
					status: "Pay",
					action: () => {
						throw new LeofreshError({ message: "Method not implemented" });
					},
					icon: BanknoteArrowUp,
				},
				{
					status: "Cancel",
					action: () => {
						throw new LeofreshError({ message: "Method not implemented" });
					},
					icon: CircleX,
				},
			];
		case "Overdue":
			return [
				{
					status: "Pay",
					action: () => {
						throw new LeofreshError({ message: "Method not implemented" });
					},
				},
			];
		case "Submitted":
			return [
				{
					status: "Pay",
					action: () => {
						throw new LeofreshError({ message: "Method not implemented" });
					},
				},
				{
					status: "Cancel",
					action: () => {
						throw new LeofreshError({ message: "Method not implemented" });
					},
				},
			];
		case "Partly Paid":
			return [
				{
					status: "Pay",
					action: () => {
						throw new LeofreshError({ message: "Method not implemented" });
					},
				},
			];
		default:
			return [];
	}
}
