import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type React from "react";

export type LeoFreshDialogProps = {
	DialogChild: React.ReactNode;
	DialogSubmitButton?: React.ReactNode;
	title: string;
	description: string;
	DialogTriggerChild: React.ReactNode;
};

export function LeoFreshDialog({
	title,
	description,
	DialogChild,
	DialogSubmitButton,
	DialogTriggerChild,
}: LeoFreshDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>{DialogTriggerChild}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4'>{DialogChild}</div>
				<DialogFooter className='flex flex-row justify-between'>
					<DialogClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DialogClose>
					{DialogSubmitButton && DialogSubmitButton}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
