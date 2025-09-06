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
				<TeamSwitcher />
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
