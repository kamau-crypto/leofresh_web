import z from "zod";

export const userLoginSchema = z.object({
	username: z
		.string()
		.min(2, { error: "Username must be more than 2 characters" })
		.max(15, { error: "Username cannot be more than 15 characters" }),
	password: z
		.string()
		.min(4, { error: "Password must be more than 6 characters" })
		.max(15, { error: "Password must be less than 15 characters" }),
});

export type UserLoginInput = z.infer<typeof userLoginSchema>;
