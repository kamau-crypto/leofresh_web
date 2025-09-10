import {
	LeoButton,
	LeoFreshDialogButtons,
	LeoFreshDialogForm,
	LeoWrapper,
} from "@/components/leofresh";
import { PlusCircle } from "lucide-react";
import { SalesOrderForm } from "./form/SalesOrderForm";
import { SalesOrderList } from "./list/SalesOrderList";

export function SalesOrder() {
	return (
		<LeoWrapper
			Content={<SalesOrderList />}
			HeaderButtons={
				<LeoFreshDialogForm
					description='Record Sales to your customers filling this form.'
					title='New Sales Order'
					DialogTriggerChild={
						<LeoButton>
							Add Sales Order <PlusCircle className='ml-2 w-4 h-4' />
						</LeoButton>
					}
					DialogChild={<SalesOrderForm Buttons={<LeoFreshDialogButtons />} />}
				/>
			}
			description='Manage Sales Orders created by clients here.'
			title='Sales Order'
		/>
	);
}
