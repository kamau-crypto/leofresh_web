import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
	return <div>Hello "/app/stock/"!</div>;
}

export const Route = createFileRoute("/app/stock/")({
	component: RouteComponent,
});
