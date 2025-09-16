import { useAuth } from "@/components";
import type { CreateBOMEntity, GetBOMsFilterEntity } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { BOMRepository } from "@/repository";
import { BOMUseCase } from "@/use-cases/bom.use-case";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useListBOMs({
	params,
}: {
	params: Omit<GetBOMsFilterEntity, "fields">;
}) {
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
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const { mutateAsync, error, data } = useMutation({
		mutationKey: ["create-bom", user?.user?.email],
		mutationFn: async (data: CreateBOMEntity) => {
			if (!user?.user?.email)
				throw new LeofreshError({ message: "User not authenticated" });
			const bomRepo = new BOMRepository();
			const bomUseCase = new BOMUseCase({ bomRepository: bomRepo });
			return await bomUseCase.createBOMs(data);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["bom-list"] });
		},
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { mutateAsync, data };
}
