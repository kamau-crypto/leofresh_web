// src/components/pages/bom/create/BOMCreateMultiStepForm.tsx
import { MultiStepForm, type StepConfig } from "@/components/leofresh";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BasicInfoStep } from "./BasicInfoStep";
import { ItemsStep } from "./ItemStep";
import { ReviewStep } from "./ReviewStep";

// Step schemas
const basicInfoSchema = z.object({
	item_name: z.string().min(1, "Item name is required"),
	description: z.string().optional(),
	uom: z.string().min(1, "UOM is required"),
	quantity: z.number().min(0.001, "Quantity must be greater than 0"),
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
	submit_on_creation: z.boolean(),
});

// Complete form schema
const bomFormSchema = basicInfoSchema.merge(itemsSchema).merge(reviewSchema);

type BOMFormData = z.infer<typeof bomFormSchema>;

export function BOMCreateMultiStepForm() {
	const form = useForm<BOMFormData>({
		resolver: zodResolver(bomFormSchema),
		defaultValues: {
			item_name: "",
			description: "",
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
			submit_on_creation: false,
		},
	});

	const handleSubmit = async (data: BOMFormData) => {
		try {
			console.log("Submitting BOM:", data);
			// Handle form submission
			// await createBOM(data);
		} catch (error) {
			console.error("Error creating BOM:", error);
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
				"description",
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
			fields: ["notes", "submit_on_creation"],
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
