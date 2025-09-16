"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Define column types
export interface LeoFreshTableColumn<T> {
	id: string;
	header: string;
	accessorKey: keyof T;
	type?: "text" | "number" | "select" | "date";
	required?: boolean;
	width?: string;
	placeholder?: string;
	options?: { label: string; value: string | number }[];
	render?: (
		value: any,
		index: number,
		form: UseFormReturn<any>
	) => React.ReactNode;
}

export interface LeoFreshTableProps<TSchema> {
	form: UseFormReturn<any>;
	name: string; // Name of the field array in the form
	columns: LeoFreshTableColumn<any>[];
	addButtonText?: string;
	defaultValues?: Record<string, any>;
	maxRows?: number;
	minRows?: number;
	disabled?: boolean;
	className?: string;
	onRowAdd?: (index: number) => void;
	onRowRemove?: (index: number) => void;
}

export function LeoFreshTable<TSchema extends z.ZodType<any, any>>({
	form,
	name,
	columns,
	addButtonText = "Add Item",
	defaultValues = [],
	maxRows,
	minRows = 0,
	disabled = false,
	className,
	onRowAdd,
	onRowRemove,
}: LeoFreshTableProps<TSchema>) {
	const [selectedRows, setSelectedRows] = useState<number[]>([]);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name,
	});

	// Handle select all rows
	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedRows(fields.map((_, i) => i));
		} else {
			setSelectedRows([]);
		}
	};

	// Handle row selection
	const handleRowSelect = (index: number, checked: boolean) => {
		if (checked) {
			setSelectedRows([...selectedRows, index]);
		} else {
			setSelectedRows(selectedRows.filter(i => i !== index));
		}
	};

	// Handle adding a new row
	const handleAddRow = () => {
		if (maxRows && fields.length >= maxRows) {
			return;
		}
		append(defaultValues);
		if (onRowAdd) {
			onRowAdd(fields.length);
		}
	};

	// Handle deleting selected rows
	const handleDeleteSelected = () => {
		// Sort indices in descending order to avoid index shifting issues when removing multiple items
		const sortedIndices = [...selectedRows].sort((a, b) => b - a);
		sortedIndices.forEach(index => {
			if (fields.length <= minRows) return;
			remove(index);
			if (onRowRemove) {
				onRowRemove(index);
			}
		});
		setSelectedRows([]);
	};

	return (
		<div className={cn("space-y-4", className)}>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-10 px-2'>
								<Checkbox
									checked={
										fields.length > 0 && selectedRows.length === fields.length
									}
									disabled={fields.length === 0 || disabled}
									onCheckedChange={checked => handleSelectAll(!!checked)}
									aria-label='Select all'
								/>
							</TableHead>
							{columns.map(column => (
								<TableHead
									key={column.id}
									className={column.width ? column.width : ""}>
									{column.header}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{fields.length > 0 ? (
							fields.map((field, rowIndex) => (
								<TableRow
									key={field.id}
									className={
										selectedRows.includes(rowIndex) ? "bg-primary/5" : ""
									}>
									<TableCell className='px-2'>
										<Checkbox
											checked={selectedRows.includes(rowIndex)}
											onCheckedChange={checked =>
												handleRowSelect(rowIndex, !!checked)
											}
											aria-label={`Select row ${rowIndex + 1}`}
											disabled={disabled}
										/>
									</TableCell>
									{columns.map(column => (
										<TableCell key={`${field.id}-${column.id}`}>
											{column.render ? (
												column.render(
													form.watch(
														`${name}.${rowIndex}.${column.accessorKey}`
													),
													rowIndex,
													form
												)
											) : (
												<Input
													type={column.type || "text"}
													placeholder={column.placeholder}
													disabled={disabled}
													{...form.register(
														`${name}.${rowIndex}.${column.accessorKey}` as const
													)}
													onChange={e => {
														// For number inputs, convert the value to a number
														if (column.type === "number") {
															const value =
																e.target.value === ""
																	? null
																	: Number(e.target.value);
															form.setValue(
																`${name}.${rowIndex}.${column.accessorKey}`,
																value
															);
														}
													}}
												/>
											)}
											{form.formState.errors[name]?.[rowIndex]?.[
												column.accessorKey
											] && (
												<p className='text-sm text-destructive mt-1'>
													{
														form.formState.errors[name]?.[rowIndex]?.[
															column.accessorKey
														]?.message as string
													}
												</p>
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length + 1}
									className='h-24 text-center'>
									No items
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className='flex items-center justify-between'>
				<Button
					type='button'
					variant='outline'
					size='sm'
					onClick={handleAddRow}
					disabled={
						disabled || (maxRows !== undefined && fields.length >= maxRows)
					}>
					<PlusCircle className='mr-2 h-4 w-4' />
					{addButtonText}
				</Button>

				{selectedRows.length > 0 && (
					<Button
						type='button'
						variant='destructive'
						size='sm'
						onClick={handleDeleteSelected}
						disabled={disabled || fields.length <= minRows}>
						<Trash2 className='mr-2 h-4 w-4' />
						Delete Selected ({selectedRows.length})
					</Button>
				)}
			</div>
		</div>
	);
}
