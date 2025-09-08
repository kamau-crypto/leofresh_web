import { SalesOrder } from "@/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/sales/orders")({
	component: RouteComponent,
});

function RouteComponent() {
	return <SalesOrder />;
}
