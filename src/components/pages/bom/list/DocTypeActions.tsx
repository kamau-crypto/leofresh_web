import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";

export function DocStatusActions({
	id,
	status,
}: {
	status: string;
	id: string;
}) {
	const handleCancelBOM = (id: string) => {
		toast.error(`BOM cancellation not implemented yet, ${id}`);
	};

	const handleSubmitBOM = (id: string) => {
		toast.error(`BOM submission not implemented yet, ${id}`);
	};

	const handleCreateWorkOrder = (id: string) => {
		toast.error(`Work Order creation not implemented yet, ${id}`);
	};
	const handleAmendBOM = (id: string) => {
		toast.error(`BOM amend not implemented yet, ${id}`);
	};

	switch (status) {
		case "cancelled":
			return (
				<DropdownMenuItem onClick={() => handleAmendBOM(id)}>
					Amend
				</DropdownMenuItem>
			);
		case "draft":
			return (
				<DropdownMenuItem onClick={() => handleSubmitBOM(id)}>
					Submit
				</DropdownMenuItem>
			);
		case "submitted":
			return (
				<>
					<DropdownMenuItem onClick={() => handleCreateWorkOrder(id)}>
						Create Work Order
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => handleCancelBOM(id)}>
						Cancel
					</DropdownMenuItem>
				</>
			);
		default:
			return <DropdownMenuItem>View Details</DropdownMenuItem>;
	}
}
