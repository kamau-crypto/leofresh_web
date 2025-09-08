import { LeofreshDataTable } from "@/components/leofresh";
import { useAppSelector } from "@/hooks/appHooks";
import { useListSalesInvoices } from "@/hooks/sales.invoice";
import { useEffect, useMemo, useState } from "react";
import { salesInvoiceColumns } from "./columns";

export function SalesInvoiceList() {
	const { profile } = useAppSelector(state => state.profile);

	const [salesInvFilter, setSalesInvFilter] = useState({
		cost_center: profile ? profile.cost_center : "unknown",
		limit_page_length: 100,
		limit_start: 0,
		order_by: "creation desc",
	});

	useEffect(() => {
		if (profile?.cost_center !== salesInvFilter.cost_center) {
			setSalesInvFilter(prevFilter => ({
				...prevFilter,
				cost_center: profile?.cost_center ?? "unknown",
			}));
		}
	}, [profile?.cost_center, salesInvFilter.cost_center]);

	const { data, isLoading } = useListSalesInvoices({ params: salesInvFilter });

	const memoizedData = useMemo(() => {
		if (!data) return [];
		return data;
	}, [data]);

	return (
		<LeofreshDataTable
			columns={salesInvoiceColumns}
			isLoading={isLoading}
			data={memoizedData}
			primaryFilter='name'
			filterPlaceHolder='Search by Sales Invoice Code ...'
		/>
	);
}
