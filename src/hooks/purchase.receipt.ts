import { useAuth } from "@/components";
import type { PurchaseReceiptsFilterEntity } from "@/domain/entities/purchase/purchase.receipt.entity";
import { LeofreshError } from "@/lib/error";
import { PurchaseReceiptRepository } from "@/repository/purchase.receipt.repository";
import { PurchaseReceiptUseCase } from "@/use-cases/purchase.receipt.use-case";
import { useQuery } from "@tanstack/react-query";

export function usePurchaseReceipts({
	params,
}: {
	params: Omit<PurchaseReceiptsFilterEntity, "fields">;
}) {
	const { user } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: ["purchaseReceipts", params, user?.user?.email],
		queryFn: async () => {
			const pReceiptRepo = new PurchaseReceiptRepository();
			const pReceiptUseCase = new PurchaseReceiptUseCase({
				pRRepository: pReceiptRepo,
			});
			return await pReceiptUseCase.allPurchaseReceipts(params);
		},
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { data, isLoading };
}
