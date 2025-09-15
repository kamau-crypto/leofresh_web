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
import { Button } from "../ui/button";
import { LeoButton } from "./LeoButton";

export type LeoFreshDialogFormProps = {
	DialogChild: React.ReactNode;
	DialogTriggerChild: React.ReactNode;
	title: string;
	description: string;
};

export function LeoFreshDialogForm({
	DialogChild,
	DialogTriggerChild,
	title,
	description,
}: LeoFreshDialogFormProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>{DialogTriggerChild}</DialogTrigger>
			<DialogContent className='md:max-w-4xl overflow-y-scroll max-h-[90vh] absolute'>
				<DialogHeader className='sticky'>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{DialogChild}
			</DialogContent>
		</Dialog>
	);
}

export function LeoFreshDialogButtons() {
	return (
		<DialogFooter className='grid grid-cols-2 gap-4'>
			<DialogClose asChild>
				<Button variant='outline'>Cancel</Button>
			</DialogClose>
			<LeoButton type='submit'>Create</LeoButton>
		</DialogFooter>
	);
}

export type LeoFreshDialogProps = {
	DialogChild: React.ReactNode;
	DialogTriggerChild: React.ReactNode;
	DialogSubmitButton?: React.ReactNode;
	title: string;
	description: string;
};

export function LeoFreshDialog({
	DialogChild,
	DialogTriggerChild,
	DialogSubmitButton,
	title,
	description,
}: LeoFreshDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>{DialogTriggerChild}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] md:max-w-2xl overflow-y-scroll max-h=[80vh]'>
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
