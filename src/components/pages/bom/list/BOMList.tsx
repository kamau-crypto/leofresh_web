import { LeofreshDataTable } from "@/components/leofresh";
import type { GetBOMsFilterEntity } from "@/domain";
import { useAppSelector } from "@/hooks/appHooks";
import { useListBOMs } from "@/hooks/bom";
import { useMemo, useState } from "react";
import { BOMListColumns } from "./columns";

export function BOMList() {
	const { profile } = useAppSelector(state => state.profile);
	const [filter, _setFilter] = useState<Omit<GetBOMsFilterEntity, "fields">>({
		limit_page_length: 100,
		limit_start: 0,
		order_by: "creation desc",
		default_source_warehouse: profile?.warehouse_name || undefined,
		default_target_warehouse: profile?.warehouse_name || undefined,
	});

	const { data, isLoading } = useListBOMs({ params: filter });

	const memoizedData = useMemo(() => {
		if (!data) return [];

		return data;
	}, [data]);

	return (
		<LeofreshDataTable
			columns={BOMListColumns}
			data={memoizedData}
			isLoading={isLoading}
			filterPlaceHolder='BOM Name'
			primaryFilter='name'
		/>
	);
}
