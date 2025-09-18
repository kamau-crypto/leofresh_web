import {
	LeoButton,
	LeoFreshDialogForm,
	LeoWrapper,
} from "@/components/leofresh";
import { useAppSelector } from "@/hooks/appHooks";
import { PlusCircle } from "lucide-react";
import { WorkOrderForm } from "./form/WorkOrderForm";
import { WorkOrderList } from "./list/WorkOrderList";

export function WorkOrder() {
	const { profile } = useAppSelector(state => state.profile);

	return (
		<LeoWrapper
			description='Manage and track manufacturing work orders within your warehouse.'
			title='Work Orders'
			Content={<WorkOrderList />}
			HeaderButtons={
				<LeoFreshDialogForm
					description={`Start a manufacturing process in the warehouse ${profile!.warehouse_name}`}
					title='New Work Order'
					DialogTriggerChild={
						<LeoButton>
							<PlusCircle className='siz-4 ml-2' />
							Create Work Order
						</LeoButton>
					}
					DialogChild={<WorkOrderForm />}
				/>
			}
		/>
	);
}
