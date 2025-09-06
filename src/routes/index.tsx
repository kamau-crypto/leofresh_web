"use client";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
	beforeLoad: async () => {
		throw redirect({ to: "/auth/login" });
	},
});

function Index() {
	return (
		<div className='grid w-full h-full justify-center gap-4 '>
			<h3 className='text-4xl'>Welcome to LeoFresh</h3>
			<p className='font'>Login to acccess your account</p>
			<Link
				to={"/auth/login"}
				className=' bg-primary text-white rounded-md elevation-4 text-center p-2'>
				Login
			</Link>
		</div>
	);
}
