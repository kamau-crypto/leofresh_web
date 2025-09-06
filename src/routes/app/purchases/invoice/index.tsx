import { PurchaseInvoice } from "@/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/purchases/invoice/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<PurchaseInvoice
			description='Manage Purchase Invoices'
			title='Purchase Invoices'
		/>
	);
}
