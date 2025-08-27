"use client";
import { LeoFreshSideBar } from "@/components";
import { useAuth } from "@/components/context/auth";
import { Button } from "@/components/ui/button";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Check } from "lucide-react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/app/")({
	component: Index,
	beforeLoad: ({ context }) => {
		if (!context.auth.api_token) {
			throw redirect({
				to: "/auth/login",
			})
		}
	},
});

function Index() {
	const auth = useAuth();
	return (
		<LeoFreshSideBar>
			<div className='w-full h-full flex-wrap'>
				<h3>Welcome {auth.user?.user.username}</h3>
				<div className='flex min-h-svh flex-col items-center justify-center'>
					<Button
						onClick={() =>
							toast.success("Button clicked!", {
								duration: 2000,
								icon: <Check />,
							})
						}>
						Click me
					</Button>
				</div>
			</div>
		</LeoFreshSideBar>
	)
}
