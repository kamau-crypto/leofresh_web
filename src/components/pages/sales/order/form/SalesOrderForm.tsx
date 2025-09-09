"use client";
//
//The form to house the sales order creation logic document creation and editing.

import {
	LeoFreshFormDatePicker,
	LeofreshFormField,
} from "@/components/leofresh";
import { useCalculateItemTotalPrice } from "@/components/pages/common/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
	customer: z.string().min(1, "Supplier is required"), // Combo box
	order_type: z.string().min(1, "Order type is required"), // Select
	transaction_date: z.date({ error: "Transaction date is required" }), // Date picker
	delivery_date: z.date({ error: "Delivery date is required" }), // Date picker
	selling_price_list: z.string().min(1, "Price list is required"), // Select
	// items: z
	// 	.array(
	// 		z.object({
	// 			item_code: z.string().min(1, "Product Item Code is required"),
	// 			item_name: z.string().min(1, "Product Item Name is required"),
	// 			qty: z.number().min(1, "Quantity must be at least 1"),
	// 			uom: z.string().min(1, "Unit of Measure is required"),
	// 			price: z.number().min(0, "Price must be at least 0"),
	// 		})
	// 	)
	// 	.min(1, "At least one item is required"), // Add the items at this stage
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

interface SalesOrderFormProps {
	DialogHeaderProps?: React.ReactNode;
	DialogFooterProps?: React.ReactNode;
}

export function SalesOrderForm({
	DialogFooterProps,
	DialogHeaderProps,
}: SalesOrderFormProps) {
	const defaultValues: SalesOrderFormValues = {
		customer: "",
		order_type: "Sales",
		selling_price_list: "Standard Selling",
		transaction_date: new Date(),
		delivery_date: new Date(),
		notes: "",
	};

	const form = useForm<SalesOrderFormValues>({
		resolver: zodResolver(schema),
		defaultValues,
	});
	const { watch, setValue, setError, clearErrors } = form;

	useCalculateItemTotalPrice<SalesOrderFormValues>({
		watch,
		setValue,
		setError,
		clearErrors,
	});

	const handleSubmit = (data: SalesOrderFormValues) => {
		console.log("Form Data: ", data);
	};

	return (
		<>
			{DialogHeaderProps && DialogHeaderProps}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					{/* <div className='grid gap-4'> */}
					{/* Pull the combo box for the suppliers. */}
					<LeofreshFormField<SalesOrderFormValues>
						name='customer'
						labelText='Customer'
						type='text'
						control={form.control}
						error={form.formState.errors.customer}
					/>
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
					<LeofreshFormField<SalesOrderFormValues>
						name='selling_price_list'
						labelText='Selling Price List'
						type='text'
						control={form.control}
					/>
					{/* {items.map((item, index) => (
						<LeoFreshCard
							title='Item Details'
							content={
								<>
									<h3 className='mb-2 text-lg font-medium'>#{index + 1}</h3>
									<p className='font-bold'> {item.item_name}</p>
									<LeofreshFormField<SalesOrderFormValues>
										name={`items.${index}.qty`}
										control={form.control}
										labelText='Item Quantity'
										type='number'
										placeholder='Enter quantity'
										error={form.formState.errors.items?.[index]?.qty}
									/>
									<LeofreshFormField<SalesOrderFormValues>
										type='number'
										name={`items.${index}.price`}
										labelText='Item Price'
										control={form.control}
										placeholder='Enter price per unit'
										error={form.formState.errors.items?.[index]?.price}
									/>
									<LeofreshFormField<SalesOrderFormValues>
										name={`items.${index}.uom`}
										control={form.control}
										labelText='Unit of Measure'
										placeholder='e.g pcs, kg, box'
										type='text'
										error={form.formState.errors.items?.[index]?.uom}
									/>
								</>
							}
							key={item.item_code}
							className='p-4 mb-4 border rounded-md'
							footer={`Item Code: ${item.item_code} | Total: KES ${item.qty * item.price}`}
						/>
					))} */}
					<LeofreshFormField<SalesOrderFormValues>
						name='notes'
						labelText='Additional Notes'
						placeholder='Enter any additional notes here'
						control={form.control}
						error={form.formState.errors.notes}
					/>
					{/* </div> */}
					{DialogFooterProps && DialogFooterProps}
				</form>
			</Form>
		</>
	);
}
