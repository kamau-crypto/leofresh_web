import { LeoButton, LeoWrapper } from "@/components/leofresh";
import type { PageListViewProps } from "@/presentation";
import { PlusCircle } from "lucide-react";
import { CustomerList } from "./list/CustomerList";

export function Customer({ description, title }: PageListViewProps) {
	return (
		<LeoWrapper
			Content={<CustomerList />}
			HeaderButtons={
				<LeoButton variant='default'>
					Add Customer <PlusCircle className='ml-2 w-4 h-4' />
				</LeoButton>
			}
			title={title}
			description={description}
		/>
	);
}
