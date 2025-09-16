import type { Control, FieldValues, Path } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

interface LeoFreshSelectProps<T extends FieldValues> {
	control: Control<T, any>;
	labelText: string;
	selectItems: { value: string; label: string }[];
	description?: string;
	name: Path<T>;
}

export function LeoFreshFormSelect<T extends FieldValues>({
	control,
	labelText,
	selectItems,
	description,
	name,
}: LeoFreshSelectProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{labelText && <FormLabel>{labelText}</FormLabel>}
					<Select
						onValueChange={field.onChange}
						defaultValue={field.value}>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder='Select a verified email to display' />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{selectItems.map(items => (
								<SelectItem
									key={items.value}
									value={items.value}>
									{items.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
