"use client";

import { LeoDatePicker } from "@/components/leofresh/LeoDatePicker";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/hooks/appHooks";
import { FrappeClient } from "@/lib/frappe";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Schema for work order validation
const workOrderSchema = z.object({
	production_item: z.string().min(1, "Production item is required"),
	bom_no: z.string().min(1, "BOM is required"),
	qty: z.number().min(0.0001, "Quantity must be greater than 0"),
	company: z.string().min(1, "Company is required"),
	planned_start_date: z.date({
		error: "Planned start date is required",
	}),
	source_warehouse: z.string().min(1, "Source warehouse is required"),
	wip_warehouse: z.string().optional(),
	target_warehouse: z.string().min(1, "Target warehouse is required"),
	project: z.string().optional(),
});

type WorkOrderFormValues = z.infer<typeof workOrderSchema>;

interface StockItem {
	item_code: string;
	item_name: string;
	qty_required: number;
	stock_qty: number;
	stock_uom: string;
	warehouse: string;
	sufficient: boolean;
}

export function WorkOrderForm() {
	const { profile } = useAppSelector(state => state.profile);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isCheckingStock, setIsCheckingStock] = useState(false);
	const { toasts: toast } = useToaster();

	const [items, setItems] = useState<any[]>([]);
	const [boms, setBoms] = useState<any[]>([]);
	const [warehouses, setWarehouses] = useState<any[]>([]);
	const [stockStatus, setStockStatus] = useState<StockItem[]>([]);
	const [stockSufficient, setStockSufficient] = useState<boolean | null>(null);

	// Initialize the form
	const form = useForm<WorkOrderFormValues>({
		resolver: zodResolver(workOrderSchema),
		defaultValues: {
			production_item: "",
			bom_no: "",
			qty: 1,
			company: profile?.company || "",
			planned_start_date: new Date(),
			source_warehouse: profile?.warehouse_name || "",
			wip_warehouse: "",
			target_warehouse: profile?.warehouse_name || "",
			project: profile?.project || "",
		},
	});

	const watchProductionItem = form.watch("production_item");
	const watchBomNo = form.watch("bom_no");
	const watchQty = form.watch("qty");
	const watchSourceWarehouse = form.watch("source_warehouse");

	// Load master data
	useEffect(() => {
		const fetchMasterData = async () => {
			setIsLoading(true);
			try {
				const frappe = new FrappeClient();

				// Fetch manufacturable items
				const itemsResponse = await frappe.call({
					method: "frappe.client.get_list",
					args: {
						doctype: "Item",
						fields: ["name", "item_name", "stock_uom", "is_stock_item"],
						filters: { is_stock_item: 1 },
						limit: 500,
					},
				});
				setItems(itemsResponse.message || []);

				// Fetch warehouses
				const warehousesResponse = await frappe.call({
					method: "frappe.client.get_list",
					args: {
						doctype: "Warehouse",
						fields: ["name", "warehouse_name"],
						limit: 100,
					},
				});
				setWarehouses(warehousesResponse.message || []);
			} catch (error) {
				console.error("Error fetching master data:", error);
				toast({
					title: "Error",
					description: "Failed to load required data. Please try again.",
					variant: "destructive",
				});
			} finally {
				setIsLoading(false);
			}
		};

		fetchMasterData();
	}, [toast]);

	// Load BOMs for selected item
	useEffect(() => {
		const fetchBOMs = async () => {
			if (!watchProductionItem) {
				setBoms([]);
				return;
			}

			try {
				const frappe = new FrappeClient();
				const response = await frappe.call({
					method: "frappe.client.get_list",
					args: {
						doctype: "BOM",
						fields: ["name", "item", "is_active", "is_default"],
						filters: {
							item: watchProductionItem,
							is_active: 1,
						},
						limit: 50,
					},
				});

				setBoms(response.message || []);

				// Set default BOM if available
				const defaultBom = (response.message || []).find(
					bom => bom.is_default === 1
				);
				if (defaultBom) {
					form.setValue("bom_no", defaultBom.name);
				} else if (response.message && response.message.length > 0) {
					form.setValue("bom_no", response.message[0].name);
				}
			} catch (error) {
				console.error("Error fetching BOMs:", error);
			}
		};

		fetchBOMs();
	}, [watchProductionItem, form]);

	// Check stock availability when relevant fields change
	useEffect(() => {
		const checkStockAvailability = async () => {
			if (!watchBomNo || !watchSourceWarehouse || !watchQty) {
				setStockStatus([]);
				setStockSufficient(null);
				return;
			}

			setIsCheckingStock(true);
			try {
				const frappe = new FrappeClient();

				// Get BOM items
				const bomResponse = await frappe.call({
					method: "frappe.client.get",
					args: {
						doctype: "BOM",
						name: watchBomNo,
					},
				});

				if (!bomResponse.message || !bomResponse.message.items) {
					setStockStatus([]);
					setStockSufficient(false);
					return;
				}

				const bomItems = bomResponse.message.items;
				const stockItems: StockItem[] = [];
				let allSufficient = true;

				// Check stock for each item
				for (const bomItem of bomItems) {
					const requiredQty = parseFloat(bomItem.qty) * watchQty;

					// Get stock balance
					const stockResponse = await frappe.call({
						method: "frappe.client.get_value",
						args: {
							doctype: "Bin",
							filters: {
								item_code: bomItem.item_code,
								warehouse: watchSourceWarehouse,
							},
							fieldname: ["actual_qty"],
						},
					});

					const actualQty =
						stockResponse.message && stockResponse.message.actual_qty
							? parseFloat(stockResponse.message.actual_qty)
							: 0;

					const sufficient = actualQty >= requiredQty;
					if (!sufficient) allSufficient = false;

					stockItems.push({
						item_code: bomItem.item_code,
						item_name: bomItem.item_name || bomItem.item_code,
						qty_required: requiredQty,
						stock_qty: actualQty,
						stock_uom: bomItem.stock_uom,
						warehouse: watchSourceWarehouse,
						sufficient,
					});
				}

				setStockStatus(stockItems);
				setStockSufficient(allSufficient);
			} catch (error) {
				console.error("Error checking stock:", error);
				toast({
					title: "Error",
					description: "Failed to check stock availability.",
					variant: "destructive",
				});
				setStockSufficient(null);
			} finally {
				setIsCheckingStock(false);
			}
		};

		const debounceTimer = setTimeout(checkStockAvailability, 500);
		return () => clearTimeout(debounceTimer);
	}, [watchBomNo, watchSourceWarehouse, watchQty, toast]);

	// Handle form submission
	const onSubmit = async (values: WorkOrderFormValues) => {
		if (!stockSufficient) {
			({
				title: "Insufficient Stock",
				description:
					"Cannot create work order due to insufficient stock levels.",
				variant: "destructive",
			});
			return;
		}

		setIsSubmitting(true);
		try {
			const frappe = new FrappeClient();

			// Format the payload for ERPNext
			const payload = {
				doctype: "Work Order",
				production_item: values.production_item,
				bom_no: values.bom_no,
				qty: values.qty,
				company: values.company,
				planned_start_date: format(values.planned_start_date, "yyyy-MM-dd"),
				source_warehouse: values.source_warehouse,
				wip_warehouse: values.wip_warehouse || values.source_warehouse,
				fg_warehouse: values.target_warehouse,
				project: values.project || "",
			};

			// Create work order
			const response = await frappe.call({
				method: "frappe.client.insert",
				args: {
					doc: payload,
				},
			});

			toast({
				title: "Success",
				description: `Work Order ${response.message.name} created successfully`,
			});

			// Reset form
			form.reset({
				production_item: "",
				bom_no: "",
				qty: 1,
				company: profile?.company || "",
				planned_start_date: new Date(),
				source_warehouse: profile?.warehouse_name || "",
				wip_warehouse: "",
				target_warehouse: profile?.warehouse_name || "",
				project: profile?.project || "",
			});

			// Clear stock status
			setStockStatus([]);
			setStockSufficient(null);
		} catch (error: any) {
			console.error("Error creating work order:", error);
			toast({
				title: "Error",
				description:
					error.message || "Failed to create work order. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center p-6'>
				<Loader2 className='h-8 w-8 animate-spin text-primary' />
				<p className='ml-2'>Loading data...</p>
			</div>
		);
	}

	return (
		<Card className='w-full max-w-4xl mx-auto'>
			<CardHeader>
				<CardTitle>Create Work Order</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-6'>
						<div className='grid md:grid-cols-2 gap-4'>
							{/* Production Item */}
							<FormField
								control={form.control}
								name='production_item'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Production Item</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
											disabled={isSubmitting}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select Item' />
												</SelectTrigger>
											</FormControl>
											<SelectContent className='max-h-80'>
												{items.map(item => (
													<SelectItem
														key={item.name}
														value={item.name}>
														{item.item_name || item.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>The item to produce</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* BOM No */}
							<FormField
								control={form.control}
								name='bom_no'
								render={({ field }) => (
									<FormItem>
										<FormLabel>BOM</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
											disabled={isSubmitting || boms.length === 0}>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														placeholder={
															boms.length === 0
																? "No BOMs available"
																: "Select BOM"
														}
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{boms.map(bom => (
													<SelectItem
														key={bom.name}
														value={bom.name}>
														{bom.name} {bom.is_default === 1 ? "(Default)" : ""}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Bill of Materials for the item
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid md:grid-cols-2 gap-4'>
							{/* Quantity */}
							<FormField
								control={form.control}
								name='qty'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Quantity</FormLabel>
										<FormControl>
											<Input
												type='number'
												step='0.01'
												{...field}
												onChange={e =>
													field.onChange(parseFloat(e.target.value))
												}
												disabled={isSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Company */}
							<FormField
								control={form.control}
								name='company'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={true}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Planned Start Date */}
						<FormField
							control={form.control}
							name='planned_start_date'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Planned Start Date</FormLabel>
									<LeoDatePicker
										value={field.value}
										setDate={field.onChange}
										disabled={isSubmitting}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='grid md:grid-cols-3 gap-4'>
							{/* Source Warehouse */}
							<FormField
								control={form.control}
								name='source_warehouse'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Source Warehouse</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
											disabled={isSubmitting}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select Warehouse' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{warehouses.map(warehouse => (
													<SelectItem
														key={warehouse.name}
														value={warehouse.name}>
														{warehouse.warehouse_name || warehouse.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>Raw materials warehouse</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* WIP Warehouse */}
							<FormField
								control={form.control}
								name='wip_warehouse'
								render={({ field }) => (
									<FormItem>
										<FormLabel>WIP Warehouse</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
											disabled={isSubmitting}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select Warehouse (Optional)' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{warehouses.map(warehouse => (
													<SelectItem
														key={warehouse.name}
														value={warehouse.name}>
														{warehouse.warehouse_name || warehouse.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Work-in-progress warehouse
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Target Warehouse */}
							<FormField
								control={form.control}
								name='target_warehouse'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Target Warehouse</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
											disabled={isSubmitting}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select Warehouse' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{warehouses.map(warehouse => (
													<SelectItem
														key={warehouse.name}
														value={warehouse.name}>
														{warehouse.warehouse_name || warehouse.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>Finished goods warehouse</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Project */}
						<FormField
							control={form.control}
							name='project'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Stock Status Section */}
						{isCheckingStock && (
							<div className='flex items-center justify-center py-4'>
								<Loader2 className='h-6 w-6 animate-spin text-primary mr-2' />
								<p>Checking stock availability...</p>
							</div>
						)}

						{stockStatus.length > 0 && !isCheckingStock && (
							<div className='border rounded-lg p-4'>
								<div className='flex items-center mb-4'>
									{stockSufficient ? (
										<CheckCircle2 className='h-5 w-5 text-green-500 mr-2' />
									) : (
										<AlertCircle className='h-5 w-5 text-red-500 mr-2' />
									)}
									<h3 className='text-lg font-medium'>
										Stock Status:{" "}
										{stockSufficient ? "Sufficient" : "Insufficient"}
									</h3>
								</div>

								<div className='overflow-x-auto'>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Item</TableHead>
												<TableHead>Required</TableHead>
												<TableHead>Available</TableHead>
												<TableHead>UOM</TableHead>
												<TableHead>Status</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{stockStatus.map(item => (
												<TableRow key={item.item_code}>
													<TableCell>{item.item_name}</TableCell>
													<TableCell>{item.qty_required.toFixed(2)}</TableCell>
													<TableCell>{item.stock_qty.toFixed(2)}</TableCell>
													<TableCell>{item.stock_uom}</TableCell>
													<TableCell>
														<Badge
															className={
																item.sufficient
																	? "bg-green-100 text-green-800"
																	: "bg-red-100 text-red-800"
															}>
															{item.sufficient ? "Available" : "Shortage"}
														</Badge>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</div>
						)}

						{stockStatus.length > 0 && !stockSufficient && !isCheckingStock && (
							<Alert variant='destructive'>
								<AlertCircle className='h-4 w-4' />
								<AlertTitle>Insufficient Stock</AlertTitle>
								<AlertDescription>
									There isn't enough material in the source warehouse to
									complete this work order. Please transfer additional stock or
									reduce the quantity.
								</AlertDescription>
							</Alert>
						)}

						{/* Submit Button */}
						<div className='pt-4'>
							<Button
								type='submit'
								className='w-full sm:w-auto'
								disabled={isSubmitting || isCheckingStock || !stockSufficient}>
								{isSubmitting ? (
									<>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										Creating...
									</>
								) : (
									"Create Work Order"
								)}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
