"use client";

import { ChevronRight, type LucideIcon, type LucideProps } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";

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
	const location = useLocation();
	const menuUrl = location.pathname.split("/").filter(Boolean);
	const strippedUrl = menuUrl.length > 0 && menuUrl.slice(0, -1).join("/");
	const newPath = `/${strippedUrl}`;

	return (
		<SidebarGroup>
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
										(
											menuUrl.length > 2
												? newPath === item.url
												: `/${menuUrl.join("/")}` === item.url
										)
											? "border-r-4 border-primary bg-primary/20 group/collapsible "
											: ""
									}>
									<Link
										to={item.url}
										className='flex gap-3 items-center'>
										{item.icon && <item.icon size={16} />}
										<span>{item.title}</span>
									</Link>
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
													className='[&.active]:border-r-2 [&.active]:border-primary [&.active]:bg-primary/20 rounded-2xl flex-row'>
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
