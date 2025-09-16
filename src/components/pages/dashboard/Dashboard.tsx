import { LeoWrapper } from "@/components/leofresh";
import { ReceivablesPayables } from "./tabs/Combined";

export function Dashboard() {
	return <LeoWrapper Content={<ReceivablesPayables />} />;
}
