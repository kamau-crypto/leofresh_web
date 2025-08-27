import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/forgot-password")({
	component: ForgotPassword,
});

function ForgotPassword() {
	return (
		<div className='flex flex-col items-center justify-center h-full'>
			Forgot Password. Coming soon...
		</div>
	)
}
