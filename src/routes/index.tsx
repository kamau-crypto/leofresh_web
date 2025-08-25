import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className='p-2'>
			<h3>Welcome Home!</h3>
			<div className='flex min-h-svh flex-col items-center justify-center'>
				<Button>Click me</Button>
			</div>
		</div>
	);
}
