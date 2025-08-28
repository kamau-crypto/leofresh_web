import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/sales/pos")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/app/sales/pos"!</div>;
}
