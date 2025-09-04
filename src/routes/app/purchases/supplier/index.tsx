import { Suppliers } from "@/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/purchases/supplier/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Suppliers
			description='All the suppliers in your system are listed here. You can add, edit or delete suppliers as needed.'
			title='Suppliers'
		/>
	);
}
