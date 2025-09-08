import { LeoButton, LeoWrapper } from "@/components/leofresh";
import type { PageListViewProps } from "@/presentation";
import { PlusCircle } from "lucide-react";
import { PurchaseOrderList } from "./list/PurchaseOrderList";

export function PurchaseOrder({ description, title }: PageListViewProps) {
	return (
		<LeoWrapper
			Content={<PurchaseOrderList />}
			HeaderButtons={
				<LeoButton>
					Add Purchase Receipt <PlusCircle className='ml-2 size-4' />
				</LeoButton>
			}
			description={description}
			title={title}
		/>
	);
}
