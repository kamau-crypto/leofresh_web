import { useAuth } from "@/components";
import type { ListWorkOrderFilterEntity } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { WORK_ORDER_KEYS } from "@/presentation";
import { WorkOrderRepository } from "@/repository/work.order.repository";
import { WorkOrderUseCase } from "@/use-cases/work.order.use-case";
import { useQuery } from "@tanstack/react-query";

export function useListWorkOrders(
	params: Omit<ListWorkOrderFilterEntity, "fields">
) {
	const { user } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: [...WORK_ORDER_KEYS.LIST_WORK_ORDERS, params, user?.user?.email],
		queryFn: async () => {
			const woRepo = new WorkOrderRepository();
			const woUseCase = new WorkOrderUseCase(woRepo);
			return woUseCase.getAllWorkOrders(params);
		},
		enabled: !!user?.user?.email && !!params,
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { data, isLoading };
}

export function useGetWorkOrder(name: string) {
	const { user } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: [...WORK_ORDER_KEYS.GET_WORK_ORDER, user?.user?.email, name],
		queryFn: async () => {
			const woRepo = new WorkOrderRepository();
			const woUseCase = new WorkOrderUseCase(woRepo);
			// return await woUseCase.getWorkOrder(name);
		},
		enabled: !!user?.user?.email && !!name,
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { isLoading, data };
}

export function useCreateWorkOrder() {}

export function useUpdateWorkOrder() {}
