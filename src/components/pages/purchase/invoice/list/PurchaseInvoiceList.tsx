import { LeofreshDataTable } from "@/components/leofresh";
import type { PurchaseInvoiceFilterEntityFilter } from "@/domain";
import { useAppSelector } from "@/hooks/appHooks";
import { usePurchaseInvoiceList } from "@/hooks/purchase.invoice";
import { useEffect, useMemo, useState } from "react"; // Import useEffect
import { pInvoiceColums } from "./columns";

export function PurchaseInvoiceList() {
	const { profile } = useAppSelector(state => state.profile);
	const [invFilter, setInvoiceFilter] = useState<
		Omit<PurchaseInvoiceFilterEntityFilter, "fields">
	>({
		cost_center: profile?.cost_center ?? "",
		limit_page_length: 100,
		limit_start: 0,
		order_by: "creation desc",
	});

	useEffect(() => {
		if (profile?.cost_center !== invFilter.cost_center) {
			setInvoiceFilter(prevFilter => ({
				...prevFilter,
				cost_center: profile?.cost_center ?? "",
			}));
		}
	}, [profile?.cost_center, invFilter.cost_center]);

	const { data, isLoading } = usePurchaseInvoiceList({
		params: invFilter,
	});

	const memoizedData = useMemo(() => {
		if (!data) return [];
		return data;
	}, [data]);

	return (
		<LeofreshDataTable
			columns={pInvoiceColums}
			data={memoizedData}
			filterPlaceHolder='Search Purchase Invoices by number ...'
			isLoading={isLoading}
			primaryFilter='name'
		/>
	);
}
