import { useAuth } from "@/components";
import type { PurchaseOrderFilterEntity } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { PurchaseOrderRepository } from "@/repository/purchase.order.repository";
import { PurchaseOrderUseCase } from "@/use-cases/purchase.order.use-cse";
import { useQuery } from "@tanstack/react-query";

export function useListPurchaseOrders({
	params,
}: {
	params: Omit<PurchaseOrderFilterEntity, "fields">;
}) {
	const { user } = useAuth();
	const { data, error, isLoading } = useQuery({
		queryKey: ["purchaseOrders", user?.user?.email],
		queryFn: async () => {
			const poRepository = new PurchaseOrderRepository();
			const purchaseOrderUseCase = new PurchaseOrderUseCase({
				repo: poRepository,
			});
			return await purchaseOrderUseCase.getAllPurchaseOrders({ params });
		},
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { data, isLoading };
}
