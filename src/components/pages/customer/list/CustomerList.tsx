import { LeofreshDataTable } from "@/components/leofresh";
import type { CustomerFilterEntity } from "@/domain";
import { useListCustomers } from "@/hooks/customer";
import { useMemo, useState } from "react";
import { customer } from "./columns";

export function CustomerList() {
	const [filter, _setFilter] = useState<CustomerFilterEntity>({
		limit_page_length: 100,
		limit_start: 0,
		order_by: "creation desc",
	});
	const { data, isLoading } = useListCustomers({ filter });

	const memoizedData = useMemo(() => {
		if (!data) return [];
		return data;
	}, [data]);

	return (
		<LeofreshDataTable
			primaryFilter='name'
			filterPlaceHolder='Customer Name...'
			isLoading={isLoading}
			columns={customer}
			data={memoizedData}
		/>
	);
}
