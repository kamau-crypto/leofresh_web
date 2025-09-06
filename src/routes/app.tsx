"use client";
import { LeoFreshSideBar, NotFoundError } from "@/components";
import { Button } from "@/components/ui/button";
import {
	createFileRoute,
	Outlet,
	redirect,
	useCanGoBack,
	useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
	component: Index,
	beforeLoad: ({ context }) => {
		if (!context.auth.api_token) {
			throw redirect({
				to: "/auth/login",
			});
		}
	},
	notFoundComponent: () => {
		const router = useRouter();
		const canGoBack = useCanGoBack();

		const handleBack = () => {
			if (canGoBack) {
				router.history.back();
			} else {
				router.navigate({ to: "/auth/login" });
			}
		};

		return (
			<div className='w-full h-full mx-auto flex flex-col justify-center items-center p-4'>
				<NotFoundError />
				<p className='mt-4 text-center text-lg font-inter'>
					The requested resource was not found.
				</p>
				<Button
					variant='link'
					onClick={() => handleBack()}>
					Go back
				</Button>
			</div>
		);
	},
});

function Index() {
	return (
		<LeoFreshSideBar>
			<Outlet />
		</LeoFreshSideBar>
	);
}
