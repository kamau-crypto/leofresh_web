import { LeoWrapper } from "@/components/leofresh";
import { useAppSelector } from "@/hooks/appHooks";
import { StockLevelsList } from "./list/StockLevelsList";

export function StockLevels() {
	const { profile } = useAppSelector(state => state.profile);
	return (
		<LeoWrapper
			Content={<StockLevelsList />}
			title='Stock Balance'
			description={`Stock levels at Warehouse ${profile!.warehouse_name}`}
		/>
	);
}
