import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Clipboard, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";

export function BulkWaterActions() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='size-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='size-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem
					onClick={() => {
						// navigator.clipboard.writeText(name);
						toast.success(`${name} copied to clipboard`);
					}}>
					<span className='flex items-center'>
						<Clipboard className='size-3 mr-2' />
						Copy name
					</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// export function BulkActionMenuV2() {
// 	return (
// 		<Dialog>
// 			<ContextMenu>
// 				<ContextMenuTrigger>Right click</ContextMenuTrigger>
// 				<ContextMenuContent>
// 					<ContextMenuItem>Open</ContextMenuItem>
// 					<ContextMenuItem>Download</ContextMenuItem>
// 					<DialogTrigger asChild>
// 						<ContextMenuItem>
// 							<span>Delete</span>
// 						</ContextMenuItem>
// 					</DialogTrigger>
// 				</ContextMenuContent>
// 			</ContextMenu>
// 			<DialogContent>
// 				<DialogHeader>
// 					<DialogTitle>Are you absolutely sure?</DialogTitle>
// 					<DialogDescription>
// 						This action cannot be undone. Are you sure you want to permanently
// 						delete this file from our servers?
// 					</DialogDescription>
// 				</DialogHeader>
// 				<DialogFooter>
// 					<Button type='submit'>Confirm</Button>
// 				</DialogFooter>
// 			</DialogContent>
// 		</Dialog>
// 	);
// }
