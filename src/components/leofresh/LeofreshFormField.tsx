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

// export interface HillFreshFeldFormProps<T extends FieldValues> {
// 	labelText?: string;
// 	control: Control<T, any>;
// 	name: Path<T>;
// 	error: FieldError | undefined;
// 	valueAsNumber?: boolean;
// 	style?: StyleProp<TextStyle>;
// 	right?: string;
// 	left?: string;
// 	dense?: boolean;
// 	keyBoardType?: KeyboardTypeOptions;
// 	multiline?: boolean;
// 	defaultValue?: PathValue<T, Path<T>>;
// 	disabled?: boolean;
// }

export interface LeoFreshFieldForm<T extends FieldValues> {
	control: Control<T, any>;
	name: Path<T>;
	error: FieldError | undefined;

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
	type,
	description,
}: LeoFreshFieldForm<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='grid gap-3'>
					{labelText && <FormLabel>{labelText}</FormLabel>}
					<FormControl>
						<Input
							left={left}
							type={type}
							right={right}
							placeholder={placeholder ?? ""}
							{...field}
						/>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
