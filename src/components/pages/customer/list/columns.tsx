import { LeoFreshBadge } from "@/components/leofresh/LeoBadge";
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
import type { ListCustomerEntity } from "@/domain";
import type { ColumnDef } from "@tanstack/react-table";
import { MapPin, MoreHorizontal, User } from "lucide-react";

export const customer: ColumnDef<ListCustomerEntity>[] = [
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
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => (
			<div className='flex items-center'>
				<User className='w-5 h-5 mr-2' />
				<span>{row.getValue("name")}</span>
			</div>
		),
	},
	{
		accessorKey: "customer_type",
		header: "Customer Type",
		cell: ({ row }) => (
			<div>
				<span>{row.getValue("customer_type")}</span>
			</div>
		),
		enableGrouping: true,
	},
	{
		accessorKey: "customer_group",
		header: "Customer Group",
		cell: ({ row }) => {
			const variants: Record<string, string> = {
				"Normal Agent": "success",
				"Leofresh Shops": "error",
				"Hybrid Agent": "warning",
			};
			return (
				<LeoFreshBadge
					variant={variants[String(row.getValue("customer_group"))]}>
					{row.getValue("customer_group")}
				</LeoFreshBadge>
			);
		},
	},
	{
		accessorKey: "territory",
		header: "Territory",
		cell: ({ row }) => (
			<div className='flex items-center'>
				<MapPin className='w-5 h-5 mr-1' />
				<span>{row.getValue("territory")}</span>
			</div>
		),
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
						<DropdownMenuItem>View details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
