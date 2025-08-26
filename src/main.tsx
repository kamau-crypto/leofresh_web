import { AuthProvider, useAuth } from "@/components/leofresh/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { store } from "./store";

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
	context: {
		auth: undefined!, // This will be set after we wrap the app in an AuthProvider
	},
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
			staleTime: 1000 * 60 * 5, // 5 minutes
			gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
		},
		mutations: {
			retry: 1,
		},
	},
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
				context={{ auth }}
			/>
		</SidebarProvider>
	);
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<AuthProvider>
					<AuthenticatedApp />
				</AuthProvider>
			</Provider>
			<ReactQueryDevtools
				initialIsOpen={false}
				position='right'
			/>
		</QueryClientProvider>
	</StrictMode>
);
