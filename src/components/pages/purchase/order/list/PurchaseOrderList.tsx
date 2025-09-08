import { LeofreshDataTable } from "@/components/leofresh";
import type { PurchaseOrderFilterEntity } from "@/domain";
import { useAppSelector } from "@/hooks/appHooks";
import { useListPurchaseOrders } from "@/hooks/purchase.order";
import { useEffect, useMemo, useState } from "react";
import { pOrderListColumns } from "./columns";

export function PurchaseOrderList() {
	const { profile } = useAppSelector(state => state.profile);

	const [orderFilter, setOrderFilter] = useState<
		Omit<PurchaseOrderFilterEntity, "fields">
	>({
		cost_center: profile ? profile.cost_center : "unknown",
		limit_page_length: 100,
		limit_start: 0,
		order_by: "creation desc",
	});

	useEffect(() => {
		if (profile?.cost_center !== orderFilter.cost_center) {
			setOrderFilter(prevFilter => ({
				...prevFilter,
				cost_center: profile?.cost_center ?? "unknown",
			}));
		}
	}, [profile?.cost_center, orderFilter.cost_center]);

	const { data, isLoading } = useListPurchaseOrders({ params: orderFilter });

	const memoizedData = useMemo(() => {
		if (!data) return [];
		return data;
	}, [data]);

	return (
		<LeofreshDataTable
			columns={pOrderListColumns}
			data={memoizedData}
			isLoading={isLoading}
			filterPlaceHolder='Search by Purchase Order code ...'
			primaryFilter='name'
		/>
	);
}
