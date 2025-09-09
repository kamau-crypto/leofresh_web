import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { LeoDatePicker } from "./LeoDatePicker";

export interface LeoFreshDatePickerFieldForm<T extends FieldValues> {
	control: Control<T, any>;
	name: Path<T>;

	className?: string;
	right?: React.ReactNode;
	left?: React.ReactNode;
	disabled?: boolean;
	labelText?: string;
}

export function LeoFreshFormDatePicker<T extends FieldValues>({
	control,
	name,
	className,
	right,
	left,
	disabled,
	labelText,
}: LeoFreshDatePickerFieldForm<T>) {
	return (
		<>
			<FormField
				control={control}
				name={name}
				render={({ field }) => (
					<FormItem>
						{labelText && <FormLabel>{labelText}</FormLabel>}
						{left}
						<LeoDatePicker
							{...field}
							label={labelText || "Select date"}
							value={field.value}
							onChange={field.onChange}
							className={className}
							disabled={disabled}
						/>
						{right}
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
