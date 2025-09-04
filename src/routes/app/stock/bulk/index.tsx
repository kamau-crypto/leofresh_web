import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/stock/bulk/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/app/stock/bulk"!</div>;
}
