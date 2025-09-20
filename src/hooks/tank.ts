import { useAuth } from "@/components";
import type {
	CreateTankReadingEntity,
	CustomerTankFilterEntity,
	GetTankEntity,
	GetTankReadingsEntity,
	UpdateTankReadingEntity,
} from "@/domain";
import { LeofreshError } from "@/lib/error";
import { TANK_KEYS, TANK_READING_KEYS } from "@/presentation";
import { TankReadingRepository, TankRepository } from "@/repository";
import { TankReadingUseCase } from "@/use-cases/tank.reading.use-case";
import { TankUseCase } from "@/use-cases/tank.use-case";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useListTanks({
	params,
}: {
	params: Omit<CustomerTankFilterEntity, "fields">;
}) {
	const { user } = useAuth();

	const { data, isLoading, error } = useQuery({
		queryKey: [...TANK_KEYS.LIST_TANK, user?.user.email, params],
		queryFn: async () => {
			const tankRepo = new TankRepository();

			const tkUseCase = new TankUseCase(tankRepo);
			return await tkUseCase.listCustomerTanks({ ...params });
		},
		enabled: !!user?.user.email,
	});
	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { data, isLoading };
}

export function useTankDetails({
	params,
}: {
	params: Omit<GetTankEntity, "fields">;
}) {
	const { user } = useAuth();

	const { data, isLoading, error } = useQuery({
		queryKey: [...TANK_KEYS.GET_TANK, user?.user.email, params],
		queryFn: async () => {
			const tankRepo = new TankRepository();

			const tkUseCase = new TankUseCase(tankRepo);
			return await tkUseCase.listTankDetails({ ...params });
		},
		enabled: !!user?.user.email,
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { data, isLoading };
}

export function useCreateTank() {
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const { data, mutateAsync: createTank } = useMutation({
		mutationKey: [...TANK_KEYS.CREATE_TANK, user?.user.email],
		mutationFn: async (data: any) => {
			const tankRepo = new TankRepository();

			const tkUseCase = new TankUseCase(tankRepo);
			return await tkUseCase.createTank({ ...data });
		},
		onSuccess: async () => {
			// Invalidate queries or perform any other side effects
			await queryClient.invalidateQueries({
				queryKey: [user?.user.email, "customer_tanks"],
			});
		},
		onError: (error, _variables, _context) => {
			throw new LeofreshError({ message: (error as Error).message });
		},
	});

	return { data, createTank };
}

export function useListTankReadings({
	params,
}: {
	params: Omit<GetTankReadingsEntity, "fields">;
}) {
	const { user } = useAuth();

	const { data, isLoading, error } = useQuery({
		queryKey: [
			...TANK_READING_KEYS.LIST_TANK_READING,
			user?.user.email,
			params.tank,
		],
		queryFn: async () => {
			const tkReadingRepo = new TankReadingRepository();
			const tkReadingUseCase = new TankReadingUseCase(tkReadingRepo);
			return await tkReadingUseCase.listTankReadings({ ...params });
		},
		enabled: !!user?.user.email,
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { data, isLoading };
}

export function useCreateTankReading() {
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const { data, mutateAsync: createTankReading } = useMutation({
		mutationKey: [...TANK_READING_KEYS.CREATE_TANK_READING, user?.user.email],
		mutationFn: async (data: CreateTankReadingEntity) => {
			const tkReadingRepo = new TankReadingRepository();
			const tkReadingUseCase = new TankReadingUseCase(tkReadingRepo);
			return await tkReadingUseCase.createTankReading({ ...data });
		},
		onSuccess: async (_data, _variables, _context) => {
			await queryClient.invalidateQueries({
				queryKey: [user?.user.email, TANK_READING_KEYS.LIST_TANK_READING],
			});
		},
		onError: (error, _variables, _context) => {
			throw new LeofreshError({ message: (error as Error).message });
		},
	});

	return { data, createTankReading };
}

export function useUpdateTankReading() {
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const { data, mutateAsync: updateTankReading } = useMutation({
		mutationKey: [...TANK_READING_KEYS.UPDATE_TANK_READING, user?.user.email],
		mutationFn: async (data: UpdateTankReadingEntity) => {
			const tkReadingRepo = new TankReadingRepository();
			const tkReadingUseCase = new TankReadingUseCase(tkReadingRepo);
			return await tkReadingUseCase.updateTankReading({ ...data });
		},
		onSuccess: async (_data, _variables, _context) => {
			await queryClient.invalidateQueries({
				queryKey: [user?.user.email, TANK_READING_KEYS.LIST_TANK_READING],
			});
		},
		onError: (error, _variables, _context) => {
			throw new LeofreshError({ message: (error as Error).message });
		},
	});

	return { data, updateTankReading };
}
