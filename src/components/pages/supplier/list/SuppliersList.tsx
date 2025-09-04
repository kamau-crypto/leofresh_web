import { LeofreshDataTable } from "@/components/leofresh";
import { useListSuppliers } from "@/hooks/supplier";
import { useMemo, useState } from "react";
import { supplierColumns } from "./columns";

export function SuppliersList() {
	const [order_by, setOrderBy] = useState<string>("modified desc");
	const [limit_start, setLimitStart] = useState<number>(0);
	const [limit_page_length, setLimitPageLength] = useState<number>(100);
	const supplierParams = { order_by, limit_start, limit_page_length };

	const { data, isLoading } = useListSuppliers({ supplierParams });

	const memoizedData = useMemo(() => {
		if (!data) return [];
		return data;
	}, [data]);

	return (
		<LeofreshDataTable
			columns={supplierColumns}
			data={memoizedData}
			isLoading={isLoading}
			filterPlaceHolder='Search suppliers by Name, Phone or Group'
			primaryFilter='supplier_name'
		/>
	);
}
