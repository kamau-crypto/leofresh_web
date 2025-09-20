import { LeoWrapper } from "@/components/leofresh";
import { BulkWaterList } from "./list/BulkWaterList";

export function BulkStock() {
	return (
		<LeoWrapper
			Content={<BulkWaterList />}
			title='Bulk Water Stock'
			description='Manage bulk water stock levels and tank readings.'
			HeaderButtons={null}
		/>
	);
}
