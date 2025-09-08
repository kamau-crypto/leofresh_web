"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";

import { EmptyBox } from "@/components/illustrations/EmptyBox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "../../ui/input";
import { Skeleton } from "../../ui/skeleton";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading: boolean;
	filterPlaceHolder: string;
	primaryFilter: string;
}

export function LeofreshDataTable<TData, TValue>({
	isLoading,
	columns,
	data,
	filterPlaceHolder,
	primaryFilter,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className='px-4'>
			<div className='flex items-center py-4'>
				<Input
					placeholder={filterPlaceHolder}
					value={
						(table.getColumn(primaryFilter)?.getFilterValue() as string) ?? ""
					}
					onChange={event =>
						table.getColumn(primaryFilter)?.setFilterValue(event.target.value)
					}
					className='max-w-md'
				/>
				<DataTableViewOptions table={table} />
			</div>
			<div className='max-h-[750px] overflow-auto rounded-md border'>
				<Table className='min-w-full'>
					<TableHeader className='bg-primary/20 sticky top-0 z-10'>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead
											key={header.id}
											className='font-bold'>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<DataTableLoadingSkeleton columns={columns.length} />
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='text-center '>
									<EmptyBox />
									No Results
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='text-muted-foreground flex-1 text-sm'>
				<DataTablePagination table={table} />
			</div>
		</div>
	);
}

const DataTableLoadingSkeleton = ({ columns }: { columns: number }) => {
	return (
		<>
			{Array.from({ length: 10 }).map((_, i) => (
				<TableRow key={i}>
					{Array.from({ length: columns - 2 }).map((_, j) => (
						<TableCell key={`cell_${i}_${j}`}>
							<Skeleton className='h-4 w-[150px]' />
						</TableCell>
					))}
					<TableCell>
						<Skeleton className='h-4 w-[10px]' />
					</TableCell>
					<TableCell>
						<Skeleton className='h-4 w-[100px]' />
					</TableCell>
				</TableRow>
			))}
		</>
	);
};
