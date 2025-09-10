import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<FormField
				control={control}
				name={name}
				render={({ field }) => (
					<FormItem>
						<Popover open={isOpen}>
							{labelText && <FormLabel>{labelText}</FormLabel>}
							{left}
							<FormControl>
								<PopoverTrigger asChild>
									<Button
										onClick={() => setIsOpen(!isOpen)}
										variant={"outline"}
										className={cn(
											"w-[240px] pl-3 text-left font-normal",
											className
										)}>
										{field.value ? (
											format(field.value, "PPP")
										) : (
											<span>{labelText}</span>
										)}
										<CalendarIcon className='ml-auto size-4 opacity-50' />
									</Button>
								</PopoverTrigger>
							</FormControl>
							<PopoverContent
								className='w-auto p-0'
								align='start'>
								<Calendar
									mode='single'
									selected={field.value}
									required={true}
									onSelect={date => {
										field.onChange(date);
										setIsOpen(prev => !prev);
										return;
									}}
									disabled={
										disabled ? disabled : date => date < new Date("1900-01-01")
									}
									captionLayout='dropdown'
									className='pr-10'
								/>
							</PopoverContent>
							{right}
						</Popover>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
