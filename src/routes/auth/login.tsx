import { LoginForm } from "@/components/login-form";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

// const fallback = "/login" as const;
export const Route = createFileRoute("/auth/login")({
	validateSearch: z.object({
		redirect: z.string().optional().catch(""),
	}),
	beforeLoad: ({ context, search }) => {
		if (context.auth.api_token) {
			throw redirect({ to: search.redirect || "/app/dashboard" });
		}
	},
	component: LoeLoginForm,
});

function LoeLoginForm() {
	return (
		<div className='bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 w-full'>
			<div className='w-full max-w-sm md:max-w-3xl'>
				<LoginForm />
			</div>
		</div>
	);
}
