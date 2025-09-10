"use client";
//
//The form to house the sales order creation logic document creation and editing.

import {
	LeoFreshCard,
	LeoFreshFormDatePicker,
	LeofreshFormField,
} from "@/components/leofresh";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
	customer: z.string().min(1, "Customer is required"), // Combo box
	order_type: z.string().min(1, "Order type is required"), // Select
	transaction_date: z.date({ error: "Transaction date is required" }), // Date picker
	delivery_date: z.date({ error: "Delivery date is required" }), // Date picker
	//selling_price_list: z.string().min(1, "Price list is required"), // Select
	items: z
		.array(
			z.object({
				item_code: z.string().min(1, "Product Item Code is required"),
				item_name: z.string().min(1, "Product Item Name is required"),
				qty: z.coerce
					.number<number>()
					.min(1, "Quantity must be at least 1")
					.positive(),
				uom: z.string().min(1, "Unit of Measure is required"),
				price: z.coerce.number<number>().min(0, "Price must be at least 0"),
			})
		)
		.min(1, "At least one item is required"), // Add the items at this stage
	notes: z.string().optional(),
});

export type SalesOrderFormValues = z.infer<typeof schema>;

const items = [
	{
		item_code: "ITEM001",
		item_name: "Sample Item 1",
		qty: 2,
		uom: "pcs",
		price: 100,
	},
	{
		item_code: "ITEM002",
		item_name: "Sample Item 2",
		qty: 1,
		uom: "pcs",
		price: 200,
	},
	{
		item_code: "ITEM003",
		item_name: "Sample Item 3",
		qty: 5,
		uom: "pcs",
		price: 50,
	},
];

export function SalesOrderForm({
	Buttons,
}: { Buttons?: React.ReactNode } = {}) {
	const defaultValues = {
		customer: "",
		order_type: "Sales",
		// selling_price_list: "Standard Selling",
		transaction_date: new Date(),
		delivery_date: new Date(),
		items: items,
		notes: "",
	};

	const form = useForm<SalesOrderFormValues>({
		resolver: zodResolver(schema),
		defaultValues,
	});
	// const { watch, setValue, setError, clearErrors } = form;

	// const { totals } = useCalculateItemTotalPrice<SalesOrderFormValues>({
	// 	watch,
	// 	setValue,
	// 	setError,
	// 	clearErrors,
	// });

	const handleSubmit = (data: SalesOrderFormValues) => {
		console.log("Form Data: ", data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='grid gap-4'>
					<LeoFreshCard
						title='Order Information'
						className='flex flex-wrap gap-4'
						content={
							<div className='grid gap-4'>
								<div className='grid gap-4 grid-flow-row grid-cols-2 content-center'>
									<LeofreshFormField<SalesOrderFormValues>
										name={"customer"}
										labelText='Customer'
										placeholder='Customer Name'
										type='text'
										control={form.control}
									/>
									<LeofreshFormField<SalesOrderFormValues>
										name='order_type'
										labelText='Order Type'
										type='text'
										control={form.control}
									/>
								</div>
								<div className='grid grid-cols-2 grid-flow-row gap-4'>
									<LeoFreshFormDatePicker<SalesOrderFormValues>
										name='transaction_date'
										labelText='Transaction Date'
										control={form.control}
									/>
									<LeoFreshFormDatePicker<SalesOrderFormValues>
										name='delivery_date'
										labelText='Delivery Date'
										control={form.control}
									/>
								</div>
							</div>
						}></LeoFreshCard>
					{/* Pull the combo box for the suppliers. */}
					<LeoFreshCard
						className='px-2 border rounded-md gap-4'
						title='Item Details'
						content={items.map((item, index) => (
							<div
								className='grid grid-flow-col md:grid-flow-row grid-cols-4 place-content-center gap-2 mb-4'
								key={item.item_code}>
								<div className='flex flex-row gap-2'>
									<p className='gap-1'>#{index + 1}</p>
									<p className='text-lg'> {item.item_name}</p>
								</div>
								<LeofreshFormField<SalesOrderFormValues>
									name={`items.${index}.qty`}
									control={form.control}
									type='number'
									placeholder='Quantity'
									error={form.formState.errors.items?.[index]?.qty}
								/>
								<LeofreshFormField<SalesOrderFormValues>
									type='number'
									name={`items.${index}.price`}
									control={form.control}
									placeholder='Enter price per unit'
									error={form.formState.errors.items?.[index]?.price}
								/>
								<LeofreshFormField<SalesOrderFormValues>
									name={`items.${index}.uom`}
									control={form.control}
									placeholder='e.g pcs, kg, box'
									type='text'
									error={form.formState.errors.items?.[index]?.uom}
								/>
							</div>
						))}
					/>
					<LeoFreshCard
						content={
							<>
								<LeofreshFormField<SalesOrderFormValues>
									name='notes'
									labelText='Additional Notes'
									placeholder='Enter any additional notes here'
									control={form.control}
									error={form.formState.errors.notes}
								/>
								{/* <div>{totals.grandTotal}</div> */}
							</>
						}
					/>
				</div>
				{Buttons}
			</form>
		</Form>
	);
}
