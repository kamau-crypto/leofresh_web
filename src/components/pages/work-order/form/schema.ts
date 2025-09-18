import { z } from "zod";

// Schema for work order validation
export const workOrderSchema = z.object({
	production_item: z.string().min(1, "Production item is required"),
	bom_no: z.string().min(1, "BOM is required"),
	qty: z.number().min(0.0001, "Quantity must be greater than 0"),
	planned_start_date: z.date({
		error: "Planned start date is required",
	}),
	source_warehouse: z.string().min(1, "Source warehouse is required"),
	wip_warehouse: z.string().optional(),
	target_warehouse: z.string().min(1, "Target warehouse is required"),
	skip_transfer: z.boolean().optional(),
});

export const woDefaults = {
	production_item: "",
	bom_no: "",
	qty: 1,
	planned_start_date: new Date(),
	source_warehouse: "",
	wip_warehouse: "",
	target_warehouse: "",
	skip_transfer: false,
};

export type WorkOrderFormValues = z.infer<typeof workOrderSchema>;
