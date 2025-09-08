import { LeofreshDataTable } from "@/components/leofresh";
import type { PurchaseReceiptsFilterEntity } from "@/domain/entities/purchase/purchase.receipt.entity";
import { useAppSelector } from "@/hooks/appHooks";
import { usePurchaseReceipts } from "@/hooks/purchase.receipt";
import React, { useEffect, useMemo } from "react";
import { pReceiptColumns } from "./column";

export function PurchaseReceiptList() {
	const { profile } = useAppSelector(state => state.profile);

	const [receiptFilter, setReceiptFilter] = React.useState<
		Omit<PurchaseReceiptsFilterEntity, "fields">
	>(() => ({
		cost_center: profile ? profile.cost_center : "Main",
		limit_page_length: 100,
		limit_start: 0,
		order_by: "creation desc",
	}));

	useEffect(() => {
		if (profile?.cost_center !== receiptFilter.cost_center) {
			setReceiptFilter(prevFilter => ({
				...prevFilter,
				cost_center: profile?.cost_center ?? "",
			}));
		}
	}, [profile?.cost_center, receiptFilter.cost_center]);

	const { data, isLoading } = usePurchaseReceipts({
		params: receiptFilter,
	});

	const memoizedData = useMemo(() => {
		if (!data) return [];
		return data;
	}, [data]);

	return (
		<LeofreshDataTable
			columns={pReceiptColumns}
			data={memoizedData}
			isLoading={isLoading}
			filterPlaceHolder='Search Purchase Receipts by code ...'
			primaryFilter='name'
		/>
	);
}
