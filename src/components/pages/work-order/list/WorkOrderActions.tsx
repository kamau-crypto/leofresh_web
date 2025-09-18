import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TabulateWorkOrderEntity } from "@/domain";
import { Clipboard, Eye, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";

interface WorkOrderActionProps
	extends Pick<TabulateWorkOrderEntity, "id" | "name" | "status"> {}

export function WorkOrderActions({ id, name, status }: WorkOrderActionProps) {
	const handleViewWorkOrder = (id: string) => {
		console.log("View Work Order details for ID:", id);
	};

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
						navigator.clipboard.writeText(name);
						toast.success(`${name} copied to clipboard`);
					}}>
					<span className='flex items-center'>
						<Clipboard className='size-3 mr-2' />
						Copy name
					</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => handleViewWorkOrder(id)}>
					<span className='flex items-center'>
						<Eye className='size-3 mr-2' />
						View Details
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
