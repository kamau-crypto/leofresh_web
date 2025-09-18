import { WorkOrder } from "@/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/manufacturing/work-orders/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<WorkOrder />
		</div>
	);
}
