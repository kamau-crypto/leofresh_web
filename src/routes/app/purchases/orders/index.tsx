"use client";
import { CustomersSearchableDataTable } from "@/components/customers/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/purchases/orders/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='flex flex-col'>
			<CustomersSearchableDataTable
				title='Supplier Orders'
				description='Orders Sent to the Supplier'
			/>
		</div>
	)
}
