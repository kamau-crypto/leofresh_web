"use client";
import { PurchaseOrder } from "@/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/purchases/orders/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<PurchaseOrder
			title='Orders'
			description='Manage Orders made to suppliers'
		/>
	);
}
