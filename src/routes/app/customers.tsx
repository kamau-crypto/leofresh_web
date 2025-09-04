"use client";
import { Customer } from "@/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/customers")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='flex flex-col'>
			<Customer
				title='Customers'
				description='Manage your customers efficiently. This is the list of all customers in the system'
			/>
		</div>
	);
}
