import type { Control, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";

export interface LeoFreshFieldFormCheckbox<T extends FieldValues> {
	control: Control<T, any>;
	labelText: string;
	name: Path<T>;
}

export function LeofreshFormCheckboxField<T extends FieldValues>({
	control,
	labelText,
	name,
}: LeoFreshFieldFormCheckbox<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
					<FormControl>
						<Checkbox
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
					</FormControl>
					<FormLabel>{labelText}</FormLabel>
				</FormItem>
			)}
		/>
	);
}
