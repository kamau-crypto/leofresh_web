"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useAuth } from "../context";

export function NavUser({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar?: string;
	};
}) {
	const { isMobile } = useSidebar();
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		toast.success("Logged out, Login and Try Agains", { duration: 2000 });
		navigate({ to: "/auth/login" });
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
							<UserAvatar
								name={user.name}
								avatar={user.avatar}
								email={user.email}
							/>
							<ChevronsUpDown className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg shadow-xl'
						side={isMobile ? "bottom" : "right"}
						align='end'
						sideOffset={4}>
						<DropdownMenuLabel className='p-0 font-normal'>
							<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
								<UserAvatar
									name={user.name}
									avatar={user.avatar}
									email={user.email}
								/>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />

						<DropdownMenuItem
							className='bg-destructive/70 text-white'
							onClick={handleLogout}>
							<LogOut className='text-white' />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

function UserAvatar({
	name,
	avatar,
	email,
}: {
	name: string;
	avatar?: string;
	email: string;
}) {
	return (
		<>
			<Avatar className='h-8 w-8 rounded-lg'>
				{avatar && (
					<AvatarImage
						src={avatar}
						alt={name}
					/>
				)}
				<AvatarFallback className='rounded-lg'>
					{extractChars(name)}
				</AvatarFallback>
			</Avatar>
			<div className='grid flex-1 text-left text-sm leading-tight'>
				<span className='truncate font-medium'>{name}</span>
				<span className='truncate text-xs'>{email}</span>
			</div>
		</>
	);
}
const extractChars = (name: string) => {
	const names = name.split(" ");
	return names.map(n => n.charAt(0).toUpperCase()).join("");
};
