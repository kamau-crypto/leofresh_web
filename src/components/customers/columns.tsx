import type { ColumnDef } from "@tanstack/react-table";
import {
	ChevronDown,
	ChevronUp,
	CircleCheck,
	Clock8,
	Mail,
	MoreHorizontal,
} from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
	id: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	email: string;
};

export const columns: ColumnDef<Payment>[] = [
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
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div>
				{String(row.getValue("status")).toLowerCase() === "processing" ? (
					<CircleCheck className='text-green-500 w-5 h-5 mr-2 inline' />
				) : (
					<Clock8 className='text-orange-400 w-5 h-5 mr-2 inline' />
				)}
				{row.getValue("status")}
			</div>
		),
	},
	{
		accessorKey: "email",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Email
					{column.getIsSorted() === "asc" ? (
						<ChevronUp className='ml-2 h-4 w-4 transition-1000 animate-in' />
					) : (
						<ChevronDown className='ml-2 h-4 w-4 transition-1000 animate-in' />
					)}
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className='font-medium'>
				<Mail className='mr-2 inline h-5 w-5' />
				{row.getValue("email")}
			</div>
		),
	},
	{
		accessorKey: "amount",
		header: () => (
			<div className='text-right text-[20px] sm:text-sm'>Amount</div>
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"));
			const formatted = new Intl.NumberFormat("en-KE", {
				style: "currency",
				currency: "Kes",
			}).format(amount);

			return <div className='text-right font-medium'>{formatted}</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const payment = row.original;

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
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => {
								navigator.clipboard.writeText(payment.id);
							}}>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
