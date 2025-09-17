import { useAuth } from "@/components";
import type {
	CreateBOMEntity,
	GetBOMsFilterEntity,
	UpdateBOMEntity,
} from "@/domain";
import { LeofreshError } from "@/lib/error";
import { BOMKEYS } from "@/presentation";
import { BOMRepository } from "@/repository";
import { BOMUseCase } from "@/use-cases/bom.use-case";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";

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

export function useGetBOM(name: string) {
	const { user } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: [...BOMKEYS.GET_BOM, user?.user?.email, name],
		queryFn: async () => {
			const bomRepo = new BOMRepository();
			const bomUseCase = new BOMUseCase({ bomRepository: bomRepo });
			return await bomUseCase.getBOM(name);
		},
		enabled: !!user?.user?.email && !!name,
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
			return await bomUseCase.createBOM(data);
		},
		onSuccess(_data, _variables, _context) {
			queryClient.invalidateQueries({
				queryKey: [BOMKEYS.LIST_BOM, user?.user?.email],
			});
		},
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { mutateAsync, data };
}

export function useSubmitBOM() {
	const queryClient = useQueryClient();
	const { user } = useAuth();
	const { mutateAsync: submitBOM } = useMutation({
		mutationKey: [...BOMKEYS.SUBMIT_BOM, user?.user?.email],
		mutationFn: async (name: string) => {
			if (!user?.user?.email) {
				throw new LeofreshError({ message: "User not authenticated" });
			}
			const bomRepo = new BOMRepository();
			const bomUseCase = new BOMUseCase({ bomRepository: bomRepo });
			return await bomUseCase.submitBOM({ name });
		},
		onError: (error, _variables, _context) => {
			if (error instanceof Error) {
				throw new LeofreshError({ message: error.message });
			}
		},
		onSuccess: (_data, _variables, _context) => {
			queryClient.invalidateQueries({
				queryKey: [BOMKEYS.LIST_BOM, user?.user?.email],
			});
			toast.success("BOM submitted successfully");
		},
	});

	return { submitBOM };
}

export function useCancelBOM() {
	const queryClient = useQueryClient();
	const { user } = useAuth();
	const { mutateAsync: cancelBOM } = useMutation({
		mutationKey: [...BOMKEYS.CANCEL_BOM, user?.user?.email],
		mutationFn: async (name: string) => {
			if (!user?.user?.email) {
				throw new LeofreshError({ message: "User not authenticated" });
			}
			const bomRepo = new BOMRepository();
			const bomUseCase = new BOMUseCase({ bomRepository: bomRepo });
			return await bomUseCase.cancelBOM({ name });
		},
		onError: (error, _variables, _context) => {
			if (error instanceof Error) {
				throw new LeofreshError({ message: error.message });
			}
		},
		onSuccess: (_data, _variables, _context) => {
			queryClient.invalidateQueries({
				queryKey: [BOMKEYS.LIST_BOM, user?.user?.email],
			});
			toast.success("BOM cancelled successfully");
		},
	});

	return { cancelBOM };
}

export function useUpdateBOM() {
	const queryClient = useQueryClient();
	const { user } = useAuth();
	const { mutateAsync: updateBOM } = useMutation({
		mutationKey: [...BOMKEYS.CANCEL_BOM, user?.user?.email],
		mutationFn: async ({ name, ...bomData }: UpdateBOMEntity) => {
			if (!user?.user?.email) {
				throw new LeofreshError({ message: "User not authenticated" });
			}
			const bomRepo = new BOMRepository();
			const bomUseCase = new BOMUseCase({ bomRepository: bomRepo });
			return await bomUseCase.updateBOM({ name, ...bomData });
		},
		onError: (error, _variables, _context) => {
			if (error instanceof Error) {
				throw new LeofreshError({ message: error.message });
			}
		},
		onSuccess: (_data, _variables, _context) => {
			queryClient.invalidateQueries({
				queryKey: [BOMKEYS.LIST_BOM, user?.user?.email],
			});
			toast.success("BOM updated successfully");
		},
	});

	return { updateBOM };
}
