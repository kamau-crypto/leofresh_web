import { useAuth } from "@/components/leofresh/auth";
import { Button } from "@/components/ui/button";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
	beforeLoad: ({ context, location }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
});

function Index() {
	const auth = useAuth();
	return (
		<div className='p-2'>
			<h3>Welcome {auth.user!}</h3>
			<div className='flex min-h-svh flex-col items-center justify-center'>
				<Button>Click me</Button>
			</div>
		</div>
	);
}
