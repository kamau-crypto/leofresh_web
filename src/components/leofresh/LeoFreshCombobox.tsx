"use client";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export interface ComboboxOption {
	label: string;
	value: string;
	disabled?: boolean;
}

export interface LeoFreshComboboxProps {
	options: ComboboxOption[];
	value?: string;
	onValueChange?: (value: string) => void;
	placeholder?: string;
	emptyText?: string;
	searchPlaceholder?: string;
	disabled?: boolean;
	className?: string;
	popoverClassName?: string;
	buttonClassName?: string;
	allowClear?: boolean;
	searchable?: boolean;
}

export function LeoFreshCombobox({
	options,
	value,
	onValueChange,
	placeholder = "Select option...",
	emptyText = "No option found.",
	searchPlaceholder = "Search...",
	disabled = false,
	className,
	popoverClassName,
	buttonClassName,
	allowClear = false,
	searchable = true,
}: LeoFreshComboboxProps) {
	const [open, setOpen] = useState(false);

	const selectedOption = options.find(option => option.value === value);

	const handleSelect = (selectedValue: string) => {
		const newValue = selectedValue === value ? "" : selectedValue;
		onValueChange?.(newValue);
		setOpen(false);
	};

	const handleClear = (e: React.MouseEvent) => {
		e.stopPropagation();
		onValueChange?.("");
	};

	return (
		<div className={className}>
			<Popover
				open={open}
				onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={open}
						disabled={disabled}
						className={cn(
							"w-full justify-between",
							!value && "text-muted-foreground",
							buttonClassName
						)}>
						<span className='truncate'>
							{selectedOption ? selectedOption.label : placeholder}
						</span>
						<div className='flex items-center gap-1'>
							{allowClear && value && (
								<button
									type='button'
									onClick={handleClear}
									className='hover:bg-muted rounded-sm p-1'
									tabIndex={-1}>
									×
								</button>
							)}
							<ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
						</div>
					</Button>
				</PopoverTrigger>
				<PopoverContent className={cn("w-full p-0", popoverClassName)}>
					<Command>
						{searchable && (
							<CommandInput
								placeholder={searchPlaceholder}
								className='h-9'
							/>
						)}
						<CommandList>
							<CommandEmpty>{emptyText}</CommandEmpty>
							<CommandGroup>
								{options.map(option => (
									<CommandItem
										key={option.value}
										value={option.label}
										disabled={option.disabled}
										onSelect={() => handleSelect(option.value)}
										className='cursor-pointer'>
										{option.label}
										<Check
											className={cn(
												"ml-auto h-4 w-4",
												option.value === value ? "opacity-100" : "opacity-0"
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
