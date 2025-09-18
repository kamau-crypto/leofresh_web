"use client";

import {
	LeoFreshCard,
	LeoFreshDialogButtons,
	LeofreshFormField,
} from "@/components/leofresh";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	woDefaults,
	workOrderSchema,
	type WorkOrderFormValues,
} from "./schema";

export function WorkOrderForm() {
	const form = useForm<WorkOrderFormValues>({
		defaultValues: woDefaults,
		resolver: zodResolver(workOrderSchema),
	});

	const submitWorkOrder = (data: WorkOrderFormValues) => {
		console.log("Submitting work order:", data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(submitWorkOrder)}
				className='space-y-8'>
				<div className='grid gap-2'>
					{/* Add the item you are selecting to product, and retrieve its default BOM*/}

					<LeoFreshCard
						title='Work Order Details'
						content={
							<div className='grid grid-col-1 lg:grid-cols-2 ld:grid-flow-col gap-4 items-baseline'>
								<LeofreshFormField
									control={form.control}
									name='production_item'
									labelText='Item'
									description='The product/ semi-finished good to be produced in this work order.'
								/>
								<LeofreshFormField
									control={form.control}
									name='bom_no'
									labelText='BOM'
									description='The default BOM for the selected item.'
								/>
							</div>
						}
					/>
					<LeoFreshCard
						title='Quantity'
						content={
							<div className='grid gap-4  grid-col-1 lg:grid-cols-2'>
								<LeofreshFormField
									control={form.control}
									name='qty'
									labelText='Quantity'
									description='The quantity of the item to be produced in this work order.'
									type='number'
								/>
							</div>
						}
					/>
					<LeoFreshCard
						title='Warehouse Configuration'
						content={
							<div className='grid grid-col-1 lg:grid-cols-3 lg:grid-flow-col gap-4'>
								<LeofreshFormField
									control={form.control}
									name='source_warehouse'
									labelText='Source Warehouse'
									description='The warehouse from which raw materials will be picked.'
								/>
								<LeofreshFormField
									control={form.control}
									name='wip_warehouse'
									labelText='WIP Warehouse'
									description='The Work In Progress warehouse where semi-finished goods are stored.'
								/>
								<LeofreshFormField
									control={form.control}
									name='target_warehouse'
									labelText='Target Warehouse'
									description='The warehouse where finished goods will be stored after production.'
								/>
							</div>
						}
					/>
					<LeoFreshCard
						title={"Items & Quantities"}
						content={
							<div className='grid grid-col-1 md:grid-cols-2 grid-flow-col gap-4 h-[200px] animate-pulse opacity-45 border-primary/50 border-2 rounded-lg items-center justify-center'>
								<p>Items to be produced and their quantities will come here</p>
							</div>
						}
					/>
					<LeoFreshCard
						title='Stock Levels of Raw Materials'
						content={
							<div>
								<p>
									Validate current stock levels against the Stock quantities of
									the raw materials in the warehouse and check if negative stock
									is enabled. If it is enabled. then proceed. If its not
									enabled, then halt the process and alert the user.
								</p>
								<br />
								<p>
									Add a pubsub for item stock quantities for usage in shops,
									manufacturing, and purchase of raw materials from suppliers.
								</p>
								<br />
								<p>Stock levels of raw materials will come here</p>
							</div>
						}
					/>
				</div>
				<LeoFreshDialogButtons />
			</form>
		</Form>
	);
}
