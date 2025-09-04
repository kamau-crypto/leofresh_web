import { LeofreshDataTable } from "@/components/leofresh/";
import { useListAllProducts } from "@/hooks/item";
import { useMemo } from "react";
import { itemColumns } from "./columns";

export function ItemList() {
	const { data, isLoading } = useListAllProducts();

	const memoizedData = useMemo(() => {
		if (!data) return [];
		return data;
	}, [data]);

	return (
		<LeofreshDataTable
			data={memoizedData}
			isLoading={isLoading}
			columns={itemColumns}
			filterPlaceHolder='Search items by Name'
			primaryFilter='item_name'
		/>
	);
}
