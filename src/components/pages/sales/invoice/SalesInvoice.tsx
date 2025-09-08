import { LeoButton, LeoWrapper } from "@/components/leofresh";
import { PlusCircle } from "lucide-react";
import { SalesInvoiceList } from "./list/SalesInvoiceList";

export function SalesInvoice() {
	return (
		<LeoWrapper
			Content={<SalesInvoiceList />}
			HeaderButtons={
				<LeoButton>
					Add Sales Invoice <PlusCircle className='ml-2 w-4 h-4' />
				</LeoButton>
			}
			description='Sales from all sold Items'
			title='Sales Invoice'
		/>
	);
}
