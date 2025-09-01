import { ItemsPage } from "@/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/items/")({
	component: RouteComponent,
});

function RouteComponent() {
	return ItemsPage({
		title: "Items",
		description: "Manage your inventory items here.",
	});
}
