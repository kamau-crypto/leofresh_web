import { useAuth } from "@/components";
import type { SalesOrderFilterEntity } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { SalesOrderRepository } from "@/repository/sales.order.repository";
import { SalesOrderUseCase } from "@/use-cases/sales.order.use-case";
import { useQuery } from "@tanstack/react-query";

export function useSalesOrderList({
	params,
}: {
	params: Omit<SalesOrderFilterEntity, "fields">;
}) {
	const { user } = useAuth();

	const { data, error, isLoading } = useQuery({
		queryKey: ["salesOrders"],
		queryFn: async () => {
			const salesOrderRepo = new SalesOrderRepository();
			const salesOrderUseCase = new SalesOrderUseCase(salesOrderRepo);
			return await salesOrderUseCase.listOrders({ params });
		},
		enabled: !!user?.user?.email && !!params,
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { data, isLoading };
}
