"use client";
import { LeoFreshSideBar } from "@/components";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
	component: Index,
	beforeLoad: ({ context }) => {
		if (!context.auth.api_token) {
			throw redirect({
				to: "/auth/login",
			});
		}
	},
});

function Index() {
	return (
		<LeoFreshSideBar>
			<Outlet />
		</LeoFreshSideBar>
	);
}
