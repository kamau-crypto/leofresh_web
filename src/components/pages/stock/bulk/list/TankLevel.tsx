import { AnimatedTank } from "@/components/illustrations/TankIllustration";
import { Skeleton } from "@/components/ui/skeleton";
import { useListTankReadings } from "@/hooks/tank";
import { convertToLocalDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { useMemo } from "react";

export type TankLevelProps = {
	lowLevel: number;
	tank_name: string;
	lowLowLevel: number;
	tk_height: number;
	diameter: number;
};

export function TankLevel({
	tank_name,
	tk_height,
	lowLevel,
	lowLowLevel,
	diameter,
}: TankLevelProps) {
	const { data, isLoading } = useListTankReadings({
		params: {
			tank: tank_name,
			limit_page_length: 1,
			limit_start: 0,
			order_by: "date desc",
		},
	});

	const tkDetails = useMemo(() => {
		if (!data) return null;
		return data[0];
	}, [data]);

	if (isLoading) {
		return <Skeleton className='h-44 w-32' />;
	}

	return (
		<div className='flex flex-col items-center justify-center px-2'>
			<AnimatedTank
				calibration={{
					realDiameter: +diameter,
					realHeight: +tk_height,
					realLowLevel: +lowLevel,
					realLowLowLevel: +lowLowLevel,
					realWaterLevel: +(tkDetails ? tkDetails.height : 0),
				}}
			/>
			<div className='grid text-left gap-2 p-1 mt-2'>
				<p className='text-sm font-sans font-bold text-gray-500'>
					Capacity : {tkDetails ? tkDetails.volume : 0} Ltrs
				</p>
				<p className='text-xs text-gray-400 flex items-center'>
					<Calendar className='size-4 mr-2' />
					{tkDetails?.date ? convertToLocalDate(tkDetails.date) : "N/A"}
				</p>
			</div>
		</div>
	);
}
