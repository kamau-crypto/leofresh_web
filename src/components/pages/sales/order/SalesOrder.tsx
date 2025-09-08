import { LeoButton, LeoWrapper } from "@/components/leofresh";
import { PlusCircle } from "lucide-react";
import { SalesOrderList } from "./list/SalesOrderList";

export function SalesOrder() {
	return (
		<LeoWrapper
			Content={<SalesOrderList />}
			HeaderButtons={
				<LeoButton>
					Add Sales Order <PlusCircle className='ml-2 w-4 h-4' />
				</LeoButton>
			}
			description='Manage Sales Orders created by clients here.'
			title='Sales Order'
		/>
	);
}
