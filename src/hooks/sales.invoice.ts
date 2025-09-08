import { useAuth } from "@/components";
import type { SalesInvoiceFilterEntity } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { SalesInvoiceRepository } from "@/repository/sales.invoice.repository";
import { SalesInvoiceUseCase } from "@/use-cases/sales.invoice.use-case";
import { useQuery } from "@tanstack/react-query";

export function useListSalesInvoices({
	params,
}: {
	params: Omit<SalesInvoiceFilterEntity, "fields">;
}) {
	const { user } = useAuth();
	const { data, error, isLoading } = useQuery({
		queryKey: ["salesInvoices", params, user?.user?.email],
		queryFn: async () => {
			const salesInvoiceRepo = new SalesInvoiceRepository();
			const salesInvoiceUseCase = new SalesInvoiceUseCase(salesInvoiceRepo);
			return await salesInvoiceUseCase.listInvoices({ params });
		},
		enabled: !!user?.user?.email && !!params,
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { data, isLoading };
}
