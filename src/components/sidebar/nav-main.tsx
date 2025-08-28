"use client";

import { ChevronRight, type LucideIcon, type LucideProps } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
		isOpen?: boolean;
		items?: {
			title: string;
			url: string;
			icon?: React.ForwardRefExoticComponent<
				Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
			>;
		}[];
	}[];
}) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Functions</SidebarGroupLabel>
			<SidebarMenu>
				{items.map(item => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isOpen}
						className={"group/collapsible"}>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton
									tooltip={item.title}
									className={
										item.isActive
											? "bg-primary text-white group/collapsible"
											: ""
									}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
									{item.items && (
										<ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
									)}
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{item.items?.map(subItem => (
										<SidebarMenuSubItem key={subItem.title}>
											<SidebarMenuSubButton asChild>
												<Link
													to={subItem.url}
													className='[&.active]:bg-primary [&.active]:text-white rounded-2xl flex-row'>
													<span className='flex gap-3 items-center'>
														{subItem.icon && <subItem.icon size={16} />}
														{subItem.title}
													</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
