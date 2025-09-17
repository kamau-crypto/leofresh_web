import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { BOMListEntity } from "@/domain";
import { useCancelBOM, useSubmitBOM } from "@/hooks/bom";
import {
	BookCheck,
	CircleX,
	Clipboard,
	Eye,
	MoreHorizontal,
	Play,
	Upload,
} from "lucide-react";
import toast from "react-hot-toast";

interface BOMActionsProps
	extends Pick<BOMListEntity, "id" | "name" | "docstatus"> {}

export function BOMActions({ id, name, docstatus }: BOMActionsProps) {
	const handleViewBOMDetails = (id: string) => {
		console.log("View BOM details for ID:", id);
	};
	const { nextSteps } = handleBOMActions({ docstatus, name });

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
				<DropdownMenuItem onClick={() => handleViewBOMDetails(id)}>
					<span className='flex items-center'>
						<Eye className='size-3 mr-2' />
						View Details
					</span>
				</DropdownMenuItem>
				{nextSteps.map((step, index) => (
					<DropdownMenuItem
						key={`${step.text}-${index}`}
						onClick={() => step.action()}>
						<span className='flex items-center'>
							<step.icon className='size-3 mr-2' />
							{step.text}
						</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function handleBOMActions({
	docstatus,
	name,
}: {
	docstatus: number;
	name: string;
}) {
	const { cancelBOM } = useCancelBOM();
	const { submitBOM } = useSubmitBOM();

	const handleCancel = () => {
		return cancelBOM(name);
	};
	const handleSubmit = () => {
		return submitBOM(name);
	};
	const handleAmend = () => {
		toast.error("Amend BOM not yet implemented", { id: name });
	};

	const handleManufacture = () => {
		// Start manufacturing process.
	};

	switch (docstatus) {
		case 0:
			return {
				text: "Draft",
				variant: "error",
				nextSteps: [
					{
						text: "Submit",
						icon: Upload,
						action: handleSubmit,
					},
				],
			};
		case 1:
			return {
				text: "Submitted",
				variant: "success",
				nextSteps: [
					{
						text: "Manufacture",
						icon: Play,
						action: handleManufacture,
					},
					{
						text: "Cancel",
						icon: CircleX,
						action: handleCancel,
					},
				],
			};
		case 2:
			return {
				text: "Cancelled",
				variant: "error",
				nextSteps: [
					{
						text: "Amend",
						icon: BookCheck,
						action: handleAmend,
					},
				],
			};
		default:
			return {
				text: "Draft",
				variant: "default",
				nextSteps: [
					{
						text: "Submit",
						icon: Upload,
						action: handleSubmit,
					},
				],
			};
	}
}
