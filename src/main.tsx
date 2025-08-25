import { useAuth } from "@/components/leofresh/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { store } from "./store";

const router = createRouter({
	routeTree,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function AuthenticatedApp() {
	const auth = useAuth();

	return (
		<SidebarProvider>
			<RouterProvider
				router={router}
				context={auth}
			/>
		</SidebarProvider>
	);
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<AuthenticatedApp />
		</Provider>
	</StrictMode>
);
