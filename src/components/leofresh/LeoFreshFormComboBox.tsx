"use client";

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { LeoFreshCombobox, type ComboboxOption } from "./LeoFreshCombobox";

export interface LeoFreshFormComboboxProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	options: ComboboxOption[];
	label?: string;
	description?: string;
	placeholder?: string;
	emptyText?: string;
	searchPlaceholder?: string;
	disabled?: boolean;
	className?: string;
	required?: boolean;
	allowClear?: boolean;
	searchable?: boolean;
	onValueChange?: (value: string) => void;
}

export function LeoFreshFormCombobox<T extends FieldValues>({
	control,
	name,
	options,
	label,
	description,
	placeholder,
	emptyText,
	searchPlaceholder,
	disabled,
	className,
	required,
	allowClear,
	searchable,
	onValueChange,
}: LeoFreshFormComboboxProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={className}>
					{label && (
						<FormLabel>
							{label}
							{required && <span className='text-destructive ml-1'>*</span>}
						</FormLabel>
					)}
					<FormControl>
						<LeoFreshCombobox
							options={options}
							value={field.value}
							onValueChange={value => {
								field.onChange(value);
								onValueChange?.(value);
							}}
							placeholder={placeholder}
							emptyText={emptyText}
							searchPlaceholder={searchPlaceholder}
							disabled={disabled}
							allowClear={allowClear}
							searchable={searchable}
						/>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
