import { LeoButton, LeoWrapper } from "@/components/leofresh";
import type { PageListViewProps } from "@/presentation";
import { PlusCircle } from "lucide-react";
import { PurchaseInvoiceList } from "./list/PurchaseInvoiceList";

export function PurchaseInvoice({ description, title }: PageListViewProps) {
	return (
		<LeoWrapper
			HeaderButtons={
				<LeoButton>
					Add Purchase Invoice <PlusCircle className='ml-2 w-4 h-4' />
				</LeoButton>
			}
			Content={<PurchaseInvoiceList />}
			title={title}
			description={description}
		/>
	);
}
