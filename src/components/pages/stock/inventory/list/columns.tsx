import { createSelectionColumn, LeoFreshDialog } from "@/components/leofresh";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DetailedListBinEntity } from "@/domain";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Milk, MoreHorizontal } from "lucide-react";
import { StockLevelDetails } from "./Detail";

export const inventoryListColumns: ColumnDef<DetailedListBinEntity>[] = [
	createSelectionColumn(),
	{
		accessorKey: "item_code",
		header: "Item Code",
		cell: ({ row }) => (
			<div className='flex items-center'>
				{row.original.image ? (
					<img
						src={row.original.image}
						alt={row.getValue("item_code")}
						className='size-6 mr-2'
					/>
				) : (
					<Milk className='size-6 mr-2 text-primary/60' />
				)}

				<span>{row.getValue("item_code")}</span>
			</div>
		),
	},
	{
		accessorKey: "item_group",
		header: "Item Group",
		cell: ({ row }) => (
			<div className='flex items-center'>
				<span>{row.getValue("item_group")}</span>
			</div>
		),
	},
	{
		accessorKey: "warehouse",
		header: "Warehouse",
		cell: ({ row }) => (
			<div className='flex items-center'>
				<span>{row.getValue("warehouse")}</span>
			</div>
		),
	},
	{
		accessorKey: "actual_qty",
		header: "Stock Qty",
		cell: ({ row }) => {
			const actualQty = Number(row.getValue("actual_qty"));
			return (
				<div className='flex items-center'>
					<span>
						{actualQty > 1
							? `${actualQty.toLocaleString("en-US")} ${row.original.stock_uom}s`
							: `${0} ${row.original.stock_uom ?? "Pcs"}`}{" "}
					</span>
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='size-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='size-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={(e: React.MouseEvent) => e.preventDefault()}>
							<LeoFreshDialog
								DialogChild={<StockLevelDetails itemDetails={row.original} />}
								DialogTriggerChild={
									<span className='flex items-center'>
										<Eye className='size-3 mr-2' />
										View Details
									</span>
								}
								title={"Stock Levels"}
								description={"View stock levels"}
							/>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
