import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/app/sales/invoice')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/app/sales/invoice"!</div>;
}
