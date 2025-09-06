import { useAuth } from "@/components";
import type { PurchaseInvoiceFilterEntityFilter } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { PurchaseInvoiceRepository } from "@/repository/purchase.invoice.repository";
import { PurchaseInvoiceUseCase } from "@/use-cases/purchase.invoice.use-case";
import { useQuery } from "@tanstack/react-query";

export const usePurchaseInvoiceList = ({
	params,
}: {
	params: Omit<PurchaseInvoiceFilterEntityFilter, "fields">;
}) => {
	const { user } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: ["purchase-invoice-list", user?.user?.email],
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
