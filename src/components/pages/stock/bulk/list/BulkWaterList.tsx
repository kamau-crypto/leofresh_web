import { LeoFreshBadge } from "@/components/leofresh/LeoBadge";
import { LeoFreshCard } from "@/components/leofresh/LeoFreshCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { CustomerTankFilterEntity, TankListEntity } from "@/domain";
import { useListTanks, useTankDetails } from "@/hooks/tank";
import { useMemo, useState } from "react";
import { TankLevel } from "./TankLevel";

export function BulkWaterList() {
	const [filter, _setFilter] = useState<
		Omit<CustomerTankFilterEntity, "fields">
	>({
		limit_page_length: 100,
		limit_start: 0,
		order_by: "name asc",
		filters: [["tank", "!=", ""]],
	});
	const { data, isLoading } = useListTanks({ params: filter });

	const memoizedData = useMemo(() => {
		if (!data) return [];

		return data;
	}, [data]);

	if (isLoading) {
		return <LeoFreshBulkLoadingComponent />;
	}

	return (
		<div className='flex flex-wrap gap-4 w-full justify-evenly'>
			{memoizedData.map(tank => (
				<LeoFreshTankCard
					key={tank.id}
					{...tank}
				/>
			))}
		</div>
	);
}

function LeoFreshBulkLoadingComponent() {
	return (
		<div className='flex flex-wrap gap-4 w-full'>
			{Array.from({ length: 50 }).map((_, index) => (
				<Skeleton
					className='h-42 w-56'
					key={index}
				/>
			))}
		</div>
	);
}

function LeoFreshTankCard({ customer_group, tank, name }: TankListEntity) {
	const { data, isLoading } = useTankDetails({ params: { tank } });

	const tankDetails = useMemo(() => {
		if (!data) return null;

		return data;
	}, [data]);

	if (isLoading || !tankDetails) {
		return <Skeleton className='h-42 w-56' />;
	}

	return (
		<div>
			<LeoFreshCard
				className='bg-primary/5'
				content={
					<div className='min-w-48 max-w-48'>
						<div className='overflow-hidden'>
							<TankLevel
								tk_height={tankDetails.height}
								lowLevel={tankDetails.low}
								lowLowLevel={tankDetails.low_low}
								diameter={tankDetails.diameter}
								tank_name={tank}
							/>
							<span className='flex justify-end'>
								<LeoFreshBadge
									variant={
										customer_group.toLocaleLowerCase().includes("shop")
											? "success"
											: "warning"
									}>
									{customer_group}
								</LeoFreshBadge>
							</span>
						</div>
					</div>
				}
				title={name}
			/>
		</div>
	);
}
