import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { SidebarProvider } from "./components/ui/sidebar";
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

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<SidebarProvider>
				<RouterProvider router={router} />
			</SidebarProvider>
		</Provider>
	</StrictMode>
);
