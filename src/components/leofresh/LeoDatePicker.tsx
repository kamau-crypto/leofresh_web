import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const LeoDatePicker = ({
	value,
	onChange,
	label,
}: {
	value: Date | null;
	label: string;
	onChange: React.Dispatch<React.SetStateAction<Date | null>>;
}) => {
	const [date, setDate] = useState<Date>(value ? new Date(value) : new Date());

	const handleChange = (newDate: Date) => {
		setDate(newDate);
		onChange(newDate);
	};

	return (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={"outline"}
						className={cn("w-[240px] pl-3 text-left font-normal")}>
						<span>{label}</span>
						<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
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
						disabled={date =>
							date > new Date() || date < new Date("1900-01-01")
						}
						captionLayout='dropdown'
						className='pr-10'
					/>
				</PopoverContent>
			</Popover>
		</>
	);
};
