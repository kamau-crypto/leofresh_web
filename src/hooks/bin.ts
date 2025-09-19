import { useAuth } from "@/components";
import type { BinListFilterEntity } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { BIN_KEYS } from "@/presentation";
import { BinRepository } from "@/repository/bin.repository";
import { BinUseCase } from "@/use-cases/bin.use-case";
import { useQuery } from "@tanstack/react-query";

export function useGetWarehouseInventory({
	params,
}: {
	params: BinListFilterEntity;
}) {
	const { user } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: [...BIN_KEYS.LIST_WAREHOUSE_BIN, user?.user.email, params],
		queryFn: async () => {
			// Placeholder for actual data fetching logic
			const binRepo = new BinRepository();
			const binUseCase = new BinUseCase(binRepo);
			return await binUseCase.getWarehouseBinData({ ...params });
		},
		enabled: !!user?.user.email,
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { data, isLoading };
}

export function useGetBulkWaterInventory({
	params,
}: {
	params: BinListFilterEntity;
}) {
	const { user } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: [...BIN_KEYS.LIST_BULK_WATER_BIN, user?.user.email],
		queryFn: async () => {
			const binRepo = new BinRepository();
			const binUseCase = new BinUseCase(binRepo);
			return await binUseCase.getBulkWaterBinData({ ...params });
		},
		enabled: !!user?.user.email,
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { data, isLoading, error };
}
