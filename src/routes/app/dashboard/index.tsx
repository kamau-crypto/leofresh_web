import { useAppSelector } from "@/hooks/appHooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	const currentProfile = useAppSelector(state => state.profile);
	return (
		<div>
			<p>
				{!currentProfile?.profile
					? "Unknown User"
					: currentProfile.profile.customer}
			</p>
			The dashboard of the application
		</div>
	);
}
