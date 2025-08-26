import React, { useState } from "react";
import { Calendar } from "../ui/calendar";

export const LeoDatePicker = ({
	value,
	onChange,
}: {
	value: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const [date, setDate] = useState<Date>(new Date(value) ?? new Date());

	const handleChange = (newDate: Date) => {
		setDate(newDate);
		onChange(newDate.toLocaleString());
	};

	return (
		<div className='relative'>
			<Calendar
				mode='single'
				defaultMonth={date}
				required={true}
				selected={date}
				onSelect={handleChange}
				className='pr-10'
			/>
		</div>
	);
};
