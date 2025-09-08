import { LeoButton, LeoWrapper } from "@/components/leofresh";
import type { PageListViewProps } from "@/presentation";
import { PlusCircle } from "lucide-react";
import { PurchaseReceiptList } from "./list/PurchaseReceiptList";

export default function PurchaseReceipt({
	description,
	title,
}: PageListViewProps) {
	return (
		<LeoWrapper
			HeaderButtons={
				<LeoButton>
					Add Purchase Receipt <PlusCircle className='ml-2 size-4' />
				</LeoButton>
			}
			Content={<PurchaseReceiptList />}
			description={description}
			title={title}
		/>
	);
}
