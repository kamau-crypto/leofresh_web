import { Droplets } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { leofreshRoutes } from "@/presentation";
import { useAuth } from "../context";

const data = {
	teams: [
		{
			name: "Leofresh Limited",
			logo: Droplets,
			plan: "Enterprise",
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const auth = useAuth();
	const user = auth.user && auth.user.user;

	// if (!user) {
	// 	auth.logout();
	// 	return <Navigate to='/auth/login' />;
	// }

	const { email, username } = user!;

	return (
		<Sidebar
			variant='floating'
			collapsible='icon'
			{...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={leofreshRoutes} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={{ email, name: username }} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
