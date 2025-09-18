import { ChevronsUpDown, Factory, Plus, Store } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";

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

// Default fallback profile
const DEFAULT_PROFILE: ReadProfileEntity = {
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
};

export function TeamSwitcher() {
	const currentProfile = useAppSelector(state => state.profile);
	const dispatch = useAppDispatch();
	const { isMobile } = useSidebar();
	const { data: profilesData, isLoading } = usePOSProfile();

	// Memoize profiles to prevent unnecessary re-renders
	const profiles = useMemo(() => {
		return profilesData ? profilesData.map(profile => ({ ...profile })) : [];
	}, [profilesData]);

	// Determine active profile with priority: Redux > First Available > Default
	const activeProfile = useMemo((): ReadProfileEntity => {
		// 1. Redux store has highest priority (includes persisted data from middleware)
		if (currentProfile.profile) {
			return currentProfile.profile;
		}

		// 2. If no Redux profile and profiles are loaded, use first available
		if (profiles.length > 0) {
			return profiles[0];
		}

		// 3. Fallback to default profile
		return DEFAULT_PROFILE;
	}, [currentProfile.profile, profiles]);

	// Initialize Redux store when no profile exists but profiles are available
	useEffect(() => {
		// Only set profile if:
		// - Redux store is empty (no profile)
		// - Profiles are loaded
		// - Not currently loading
		if (!currentProfile.profile && profiles.length > 0 && !isLoading) {
			dispatch(setCustomer(profiles[0]));
		}
	}, [currentProfile.profile, profiles, isLoading, dispatch]);

	// Handle team switching - Redux middleware will handle localStorage persistence
	const handleTeamSwitch = useCallback(
		(selectedProfile: ReadProfileEntity) => {
			dispatch(setCustomer(selectedProfile));
		},
		[dispatch]
	);

	// Loading state
	if (isLoading) {
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton
						size='lg'
						disabled>
						<div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
							<Store className='size-4' />
						</div>
						<div className='grid flex-1 text-left text-sm leading-tight'>
							<span className='truncate font-medium'>Loading...</span>
							<span className='truncate text-xs'>Please wait...</span>
						</div>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		);
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
							<div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
								{activeProfile.customer ? (
									<Store className='size-4' />
								) : (
									<Factory className='size-4' />
								)}
							</div>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-medium'>
									{activeProfile.customer || "No Shop Selected"}
								</span>
								<span className='truncate text-xs'>
									{activeProfile.company || "No Company"}
								</span>
							</div>
							<ChevronsUpDown className='ml-auto' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
						align='start'
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}>
						<DropdownMenuLabel className='text-muted-foreground text-xs'>
							Shops
						</DropdownMenuLabel>

						{profiles.length > 0 ? (
							profiles.map((profile, index) => (
								<DropdownMenuItem
									key={`${profile.customer}-${profile.company}`}
									onClick={() => handleTeamSwitch(profile)}
									className='gap-2 p-2'>
									<div className='flex size-6 items-center justify-center rounded-md border'>
										<Store className='size-3.5 shrink-0 text-primary' />
									</div>
									<div className='flex flex-col'>
										<span className='truncate'>{profile.customer}</span>
									</div>
									<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
								</DropdownMenuItem>
							))
						) : (
							<DropdownMenuItem
								disabled
								className='gap-2 p-2'>
								<div className='flex size-6 items-center justify-center rounded-md border'>
									<Factory className='size-3.5 shrink-0 text-muted-foreground' />
								</div>
								<span className='text-muted-foreground'>
									No shops available
								</span>
							</DropdownMenuItem>
						)}

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
