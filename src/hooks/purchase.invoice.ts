import { useAuth } from "@/components";
import type { PurchaseInvoiceFilterEntityFilter } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { PurchaseInvoiceRepository } from "@/repository/purchase.invoice.repository";
import { PurchaseInvoiceUseCase } from "@/use-cases/purchase.invoice.use-case";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "./appHooks";

export const usePurchaseInvoiceList = ({
	params,
}: {
	params: Omit<PurchaseInvoiceFilterEntityFilter, "fields">;
}) => {
	const { user } = useAuth();
	const { profile } = useAppSelector(state => state);

	const { data, isLoading, error } = useQuery({
		queryKey: [
			"purchase-invoice-list",
			user?.user?.email,
			profile ? profile.profile?.cost_center : "default",
		],
		queryFn: async () => {
			const PIRepo = new PurchaseInvoiceRepository();
			const PIUseCase = new PurchaseInvoiceUseCase(PIRepo);
			return await PIUseCase.getAllPurchaseInvoices({
				cost_center: params.cost_center,
				limit_page_length: 100,
				limit_start: 0,
				order_by: "creation desc",
			});
		},
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}
	return { data, isLoading };
};
