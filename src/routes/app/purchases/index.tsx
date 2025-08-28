"use client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/purchases/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/app/purchases"!</div>;
}
