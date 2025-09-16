import { useAuth } from "@/components";
import type { GetBOMsFilterEntity } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { BOMRepository } from "@/repository";
import { BOMUseCase } from "@/use-cases/bom.use-case";
import { useQuery } from "@tanstack/react-query";

export function useListBOMs({ params }: { params: Omit<GetBOMsFilterEntity, "fields"> }) {
	const { user } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: ["boms-list", user?.user?.email, params],
		queryFn: async () => {
			const bomRepo = new BOMRepository();
			const bomUseCase = new BOMUseCase({ bomRepository: bomRepo });
			return await bomUseCase.getBOMs({ params });
		},
		enabled: !!user?.user?.email && !!params,
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { isLoading, data };
}


export function useCreateBOM() {
    
}