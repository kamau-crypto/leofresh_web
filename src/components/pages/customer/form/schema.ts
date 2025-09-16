import { z } from "zod";

export const schema = z.object({
	customer_name: z.string().min(1, "Customer Name is required"),
	customer_type: z.enum(["Company", "Individual", "Partnership"], {
		message: "Customer Type is required",
	}),
	customer_group: z.string().optional(),
	territory: z.string({ error: "Customer Territory is required" }).optional(),
	customer_code: z.string().optional(),
});

export type CreateCustomerFormValues = z.infer<typeof schema>;
