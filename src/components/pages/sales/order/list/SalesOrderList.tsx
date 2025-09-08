import { LeofreshDataTable } from "@/components/leofresh";
import type { SalesOrderFilterEntity } from "@/domain";
import { useAppSelector } from "@/hooks/appHooks";
import { useSalesOrderList } from "@/hooks/sales.order";
import { useEffect, useMemo, useState } from "react";
import { salesOrderColumns } from "./columns";

export function SalesOrderList() {
	const { profile } = useAppSelector(state => state.profile);

	const [salesOrderFilter, setSalesOrderFilter] = useState<
		Omit<SalesOrderFilterEntity, "fields">
	>({
		cost_center: profile ? profile.cost_center : "unknown",
		limit_page_length: 100,
		limit_start: 0,
		order_by: "creation desc",
	});

	useEffect(() => {
		setSalesOrderFilter(prev => ({
			...prev,
			cost_center: profile ? profile.cost_center : "unknown",
		}));
	}, [profile?.cost_center]);

	const { data, isLoading } = useSalesOrderList({ params: salesOrderFilter });

	const memoizedData = useMemo(() => {
		if (!data) return [];
		return data.map(item => ({
			...item,
		}));
	}, [data]);

	return (
		<LeofreshDataTable
			data={memoizedData}
			isLoading={isLoading}
			columns={salesOrderColumns}
			filterPlaceHolder='Search Sales Orders by code ...'
			primaryFilter='name'
		/>
	);
}
