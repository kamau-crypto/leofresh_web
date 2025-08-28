import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/stock/balance")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/app/stock/balance"!</div>;
}
