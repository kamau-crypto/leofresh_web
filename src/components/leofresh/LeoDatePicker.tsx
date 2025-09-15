import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface LeoFreshDatePickerProps {
	value: Date | null;
	label: string;
	className?: string;
	disabled?: boolean;
	onChange: React.Dispatch<React.SetStateAction<Date | null>>;
}

export const LeoDatePicker = ({
	value,
	onChange,
	label,
	className,
	disabled,
}: LeoFreshDatePickerProps) => {
	const [date, setDate] = useState<Date>(value ? new Date(value) : new Date());

	const handleChange = (newDate: Date) => {
		setDate(newDate);
		onChange(newDate);
	};
	const isDisabled =
		disabled ?? (() => date > new Date() || date < new Date("1900-01-01"));

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn("w-[240px] pl-3 text-left font-normal", className)}>
					<span>{label}</span>
					<CalendarIcon className='ml-auto size-4 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='w-auto p-0'
				align='start'>
				<Calendar
					mode='single'
					selected={date}
					required={true}
					defaultMonth={date}
					onSelect={handleChange}
					disabled={isDisabled}
					captionLayout='dropdown'
					className='pr-10'
				/>
			</PopoverContent>
		</Popover>
	);
};
