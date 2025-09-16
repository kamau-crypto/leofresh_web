// src/components/pages/bom/create/BOMCreateMultiStepForm.tsx
import { MultiStepForm, type StepConfig } from "@/components/leofresh";
import type { CreateBOMEntity } from "@/domain";
import { useAppSelector } from "@/hooks/appHooks";
import { useCreateBOM } from "@/hooks/bom";
import { useListItems } from "@/hooks/item";
import { LeofreshError } from "@/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BasicInfoStep } from "./BasicInfoStep";
import { ItemsStep } from "./ItemStep";
import { ReviewStep } from "./ReviewStep";

// Step schemas
const basicInfoSchema = z.object({
	item_name: z.string().min(1, "Item name is required"),
	uom: z.string().min(1, "UOM is required"),
	quantity: z.number().min(1, "Quantity must be greater than 0"),
	target_warehouse: z.string().optional(),
	rm_cost_as_per: z.enum([
		"Valuation Rate",
		"Last Purchase Rate",
		"Standard Rate",
	]),
	is_active: z.boolean(),
	is_default: z.boolean(),
});

const itemsSchema = z.object({
	items: z
		.array(
			z.object({
				item_code: z.string().min(1, "Item code is required"),
				qty: z.coerce
					.number<number>()
					.min(0.001, "Quantity must be greater than 0"),
				rate: z.coerce.number<number>().min(0, "Rate must be non-negative"),
				uom: z.string().min(1, "UOM is required"),
			})
		)
		.min(1, "At least one item is required"),
});

const reviewSchema = z.object({
	notes: z.string().optional(),
	process_loss_percentage: z.number().optional(),
	process_loss_qty: z.number().optional(),
	submit_on_creation: z.boolean(),
});

// Complete form schema
const bomFormSchema = basicInfoSchema.merge(itemsSchema).merge(reviewSchema);

type BOMFormData = z.infer<typeof bomFormSchema>;
export type BasicInfoItems = z.infer<typeof basicInfoSchema>;

export function BOMCreateMultiStepForm() {
	const { profile } = useAppSelector(state => state.profile);
	const { mutateAsync: createBOM } = useCreateBOM();
	const { data: items, isLoading } = useListItems();

	const form = useForm<BOMFormData>({
		resolver: zodResolver(bomFormSchema),
		defaultValues: {
			item_name: "",
			target_warehouse: profile?.warehouse_name || "",
			rm_cost_as_per: "Valuation Rate",
			uom: "",
			quantity: 1,
			is_active: true,
			is_default: false,
			items: [
				{
					item_code: "",
					qty: 1,
					rate: 0,
					uom: "",
				},
			],
			notes: "",
			process_loss_percentage: 0,
			process_loss_qty: 0,
			submit_on_creation: false,
		},
	});

	const itemList = useMemo(() => {
		if (!items) return [];
		return items;
	}, [items, isLoading]);

	const handleSubmit = async (data: BOMFormData) => {
		try {
			const createData: CreateBOMEntity = {
				...data,
				item: data.item_name,
				is_active: data.is_active ? 1 : 0,
				is_default: data.is_default ? 1 : 0,
				items: data.items.map(item => ({
					item_code:
						itemList.find(i => item.item_code === i.item_name)?.item_code ||
						item.item_code,
					uom: item.uom,
					qty: item.qty,
					rate: item.rate,
				})),
			};

			const name = await createBOM(createData);
			console.log("Item Created", name);
			// Handle form submission
			// await createBOM(data);
		} catch (error) {
			if (error instanceof Error) {
				throw new LeofreshError({ message: error.message });
			}
		}
	};

	const steps: StepConfig<BOMFormData>[] = [
		{
			id: "basic-info",
			title: "Basic Information",
			description: "Enter basic BOM details",
			schema: basicInfoSchema,
			fields: [
				"item_name",
				"rm_cost_as_per",
				"target_warehouse",
				"uom",
				"quantity",
				"is_active",
				"is_default",
			],
			component: BasicInfoStep,
		},
		{
			id: "items",
			title: "BOM Items",
			description: "Add items to your BOM",
			schema: itemsSchema,
			fields: ["items"],
			component: ItemsStep,
		},
		{
			id: "review",
			title: "Review & Submit",
			description: "Review your BOM before submission",
			schema: reviewSchema,
			fields: [
				"notes",
				"submit_on_creation",
				"process_loss_percentage",
				"process_loss_qty",
			],
			component: ReviewStep,
		},
	];

	return (
		<MultiStepForm
			form={form}
			steps={steps}
			onSubmit={handleSubmit}
			allowStepNavigation={true}
			className='max-w-4xl mx-auto'
		/>
	);
}
