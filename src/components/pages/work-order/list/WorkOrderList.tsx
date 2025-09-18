import { LeofreshDataTable } from "@/components/leofresh";
import type { ListWorkOrderFilterEntity } from "@/domain";
import { useAppSelector } from "@/hooks/appHooks";

import { useListWorkOrders } from "@/hooks/work.order";
import { useEffect, useMemo, useState } from "react";
import { woColumns } from "./columns";

export function WorkOrderList() {
	const { profile } = useAppSelector(state => state.profile);

	const [filter, setFilter] = useState<
		Omit<ListWorkOrderFilterEntity, "fields">
	>({
		limit_page_length: 100,
		limit_start: 0,
		order_by: "creation desc",
		filters: [["fg_warehouse", "=", profile!.warehouse_name]],
	});

	const { data, isLoading } = useListWorkOrders({ ...filter });

	useEffect(() => {
		setFilter(prev => ({
			...prev,
			filters: [["fg_warehouse", "=", profile!.warehouse_name]],
		}));
	}, [profile?.warehouse_name]);

	const memoizedData = useMemo(() => {
		if (!data) return [];
		return data;
	}, [data]);

	return (
		<LeofreshDataTable
			columns={woColumns}
			data={memoizedData}
			isLoading={isLoading}
			filterPlaceHolder={"Work Order Name"}
			primaryFilter={"name"}
		/>
	);
}
