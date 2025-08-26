import { AppSidebar } from "@/components/app-sidebar";
import type { AuthContext } from "@/components/leofresh/auth";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface RouterContext {
	auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<>
			<AppSidebar />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
