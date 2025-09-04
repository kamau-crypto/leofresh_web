import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/purchases/invoice/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/app/suppliers/invoice/"!</div>;
}
