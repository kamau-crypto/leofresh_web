"use client";
import { cn } from "@/lib/utils";
import type {
	Control,
	FieldError,
	FieldValues,
	Path,
	PathValue,
} from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export interface LeoFreshFieldForm<T extends FieldValues> {
	control: Control<T, any>;
	name: Path<T>;
	error?: FieldError;

	className?: string;
	right?: React.ReactNode;
	left?: React.ReactNode;
	defaultValue?: PathValue<T, Path<T>>;
	disabled?: boolean;
	type?: string;
	placeholder?: string;
	labelText?: string;
	description?: string;
}

export function LeofreshFormField<T extends FieldValues>({
	name,
	control,
	placeholder,
	left,
	right,
	labelText,
	type = "text",
	description,
	disabled,
	className,
}: LeoFreshFieldForm<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn("grid gap-3", className)}>
					{labelText && <FormLabel>{labelText}</FormLabel>}
					<div className='relative'>
						{left && (
							<div className='absolute left-3 top-1/2 -translate-y-1/2 z-10'>
								{left}
							</div>
						)}
						<FormControl>
							<Input
								type={type}
								placeholder={placeholder ?? ""}
								disabled={disabled}
								className={cn(left && "pl-10", right && "pr-10")}
								{...field}
								value={field.value ?? ""}
								onChange={e => {
									// Handle number conversion for number inputs
									if (type === "number") {
										const value =
											e.target.value === "" ? "" : Number(e.target.value);
										field.onChange(value);
									} else {
										field.onChange(e.target.value);
									}
								}}
							/>
						</FormControl>
						{right && (
							<div className='absolute right-3 top-1/2 -translate-y-1/2 z-10'>
								{right}
							</div>
						)}
					</div>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
