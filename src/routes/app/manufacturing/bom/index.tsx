import { BOM } from "@/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/manufacturing/bom/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <BOM />;
}
