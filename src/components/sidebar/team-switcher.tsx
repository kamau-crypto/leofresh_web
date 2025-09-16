import { ChevronsUpDown, Factory, Plus, Store } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import type { ReadProfileEntity } from "@/domain";
import { useAppDispatch, useAppSelector } from "@/hooks/appHooks";
import { usePOSProfile } from "@/hooks/profile";
import { setCustomer } from "@/store/profile";

export function TeamSwitcher() {
	const currentProfile = useAppSelector(state => state.profile);
	const dispatch = useAppDispatch();
	const { isMobile } = useSidebar();

	const [activeTeam, setActiveTeam] = useState<ReadProfileEntity>(() =>
		!currentProfile.profile
			? {
					customer: "Leofresh Limited",
					company: "Leofresh Limited",
					warehouse_name: "Main Warehouse",
					source_warehouse: "",
					cost_center: "",
					currency: "",
					selling_price_list: "",
					user_email: "",
					project: "",
					lnmo: null,
					bank_no: null,
					bank_account: "",
					expense_account: "",
					income_account: "",
					debtor_account: "",
					unrealized_profit: "",
					waste_water: 0,
					write_off_account: "",
				}
			: currentProfile.profile!
	);
	const { data, isLoading } = usePOSProfile();

	const profiles = useMemo(() => {
		return data ? data.map(profile => ({ ...profile })) : [];
	}, [data]);
	// Look for a session for this use case.
	//
	// Set initial active team only when data is loaded
	useEffect(() => {
		if (profiles.length > 0) {
			setActiveTeam(profiles[0]);
		}
	}, [profiles]);

	useEffect(() => {
		if (activeTeam.customer && activeTeam.customer.length > 0) {
			dispatch(setCustomer(activeTeam));
		} else {
			dispatch(setCustomer(null));
		}
	}, [activeTeam, dispatch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	// You can also display user profile information here if needed

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
							<div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
								{activeTeam.customer ? (
									<Store className='size-4' />
								) : (
									<Factory className='size-4' />
								)}
							</div>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-medium'>
									{activeTeam.customer}
								</span>
								<span className='truncate text-xs'>{activeTeam.company}</span>
							</div>
							<ChevronsUpDown className='ml-auto' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
						align='start'
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}>
						<DropdownMenuLabel className='text-muted-foreground text-xs'>
							Shops
						</DropdownMenuLabel>
						{profiles.map((profile, index) => (
							<DropdownMenuItem
								key={profile.customer}
								onClick={e => {
									e.preventDefault();
									setActiveTeam(profile);
									dispatch(setCustomer(profile));
								}}
								className='gap-2 p-2'>
								<div className='flex size-6 items-center justify-center rounded-md border'>
									{profile.customer.length > 1 ? (
										<Store className='size-3.5 shrink-0 text-primary' />
									) : (
										<Factory className='size-3.5 shrink-0 text-primary' />
									)}
								</div>
								{profile.customer}
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className='gap-2 p-2'>
							<div className='flex size-6 items-center justify-center rounded-md border bg-transparent'>
								<Plus className='size-4' />
							</div>
							<div className='text-muted-foreground font-medium'>Add Shop</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
