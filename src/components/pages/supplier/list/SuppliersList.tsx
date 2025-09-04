import { LeofreshDataTable } from "@/components/leofresh";
import type { SupplierFilterEntity } from "@/domain";
import { useListSuppliers } from "@/hooks/supplier";
import { useMemo, useState } from "react";
import { supplierColumns } from "./columns";

export function SuppliersList() {
	const [filter, _setFilter] = useState<Omit<SupplierFilterEntity, "fields">>({
		limit_page_length: 100,
		limit_start: 0,
		order_by: "modified desc",
	});

	const { data, isLoading } = useListSuppliers({ supplierParams: filter });

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
