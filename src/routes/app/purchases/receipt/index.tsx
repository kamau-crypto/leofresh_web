import PurchaseReceipt from "@/components/pages/purchase/receipt/PurchaseReceipt";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/purchases/receipt/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<PurchaseReceipt
			description='Receive Orders from Suppliers, upon delivery.'
			title='Purchase Receipt'
		/>
	);
}
