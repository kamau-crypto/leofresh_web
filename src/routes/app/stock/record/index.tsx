import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/stock/record/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/app/stock/record/"!</div>;
}
