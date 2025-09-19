import { LeofreshDataTable } from "@/components/leofresh";
import type { BinListFilterEntity } from "@/domain";
import { useAppSelector } from "@/hooks/appHooks";
import { useGetWarehouseInventory } from "@/hooks/bin";
import { useEffect, useMemo, useState } from "react";
import { inventoryListColumns } from "./columns";

export function StockLevelsList() {
	const { profile } = useAppSelector(state => state.profile);

	const [filter, setFilter] = useState<BinListFilterEntity>({
		limit_page_length: 100,
		limit_start: 0,
		order_by: "creation desc",
		warehouse: profile!.warehouse_name,
	});

	useEffect(() => {
		setFilter(prev => ({
			...prev,
			warehouse: profile!.warehouse_name,
		}));
	}, [profile?.warehouse_name]);

	const { data, isLoading } = useGetWarehouseInventory({ params: filter });

	const memoizedData = useMemo(() => {
		if (!data) return [];
		return data;
	}, [data]);

	return (
		<LeofreshDataTable
			columns={inventoryListColumns}
			data={memoizedData}
			isLoading={isLoading}
			filterPlaceHolder='Search by item code'
			primaryFilter='item_code'
		/>
	);
}
