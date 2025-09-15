//

import {
	LeoButton,
	LeoFreshDialogForm,
	LeoWrapper,
} from "@/components/leofresh";
import { PlusCircle } from "lucide-react";
import { BOMCreateMultiStepForm } from "./form/bom";
import { BOMList } from "./list/BOMList";

//Get the list of all BOM's
export function BOM() {
	return (
		<LeoWrapper
			Content={<BOMList />}
			HeaderButtons={
				<LeoFreshDialogForm
					description='Create a new Bill of Materials for the current Warehouse.'
					title='New Bill of Materials'
					DialogTriggerChild={
						<LeoButton>
							{" "}
							Add BOM <PlusCircle className='siz-4 ml-2' />
						</LeoButton>
					}
					DialogChild={
						<>
							<BOMCreateMultiStepForm />
						</>
					}
				/>
			}
			description='Manage Bills of Materials (BOM) used in manufacturing processes.'
			title='Bill of Materials'
		/>
	);
}
