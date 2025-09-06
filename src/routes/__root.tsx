import { NotFoundError } from "@/components";
import type { AuthContext } from "@/components/context/auth";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface RouterContext {
	auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
	notFoundComponent: () => (
		<div className='w-full h-full mx-auto flex justify-center items-center'>
			<NotFoundError />
			<div className='text-center mt-4'>Page Does Not exist</div>
		</div>
	),
});
