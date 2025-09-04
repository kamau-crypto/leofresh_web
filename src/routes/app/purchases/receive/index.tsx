import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/purchases/receive/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/app/purchases/received/"!</div>;
}
