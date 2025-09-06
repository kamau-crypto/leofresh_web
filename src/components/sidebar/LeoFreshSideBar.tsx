import { useAppSelector } from "@/hooks/appHooks";
import { toSentenceCase } from "@/lib/utils";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Factory, Store } from "lucide-react";
import { useAuth } from "../context";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export function LeoFreshSideBar({ children }: { children: React.ReactNode }) {
	const { api_token, user } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();

	const currentProfile = useAppSelector(state => state.profile);

	const paths = location.pathname.split("/").filter(Boolean);
	const leadingPath = paths.length > 0 ? paths.shift() : "Home";

	//
	//[ ] Add the various profiles within the app at this stage

	if (!api_token || !user) {
		navigate({ to: "/auth/login" });
		return;
	}
	return (
		<SidebarProvider className='shadow-xl shadow-primary/30'>
			<AppSidebar />
			<SidebarInset>
				<header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 shadow-lg shadow-primary/10 relative'>
					<div className='flex items-center gap-2 px-4  inset-0 z-10 top-0'>
						<SidebarTrigger className='-ml-1' />
						<Separator
							orientation='vertical'
							className='mr-2 data-[orientation=vertical]:h-4'
						/>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className='hidden md:block'>
									<BreadcrumbLink href={`/${leadingPath}`}>
										{leadingPath && toSentenceCase(leadingPath)}
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className='hidden md:block' />
								{/* [ ] Think of a stucture like /app/about/settings/user. And how you can create breadcrumbs from it, alongisde the proper order* convert it to a tree or a linked list*/}
								{paths.length > 0 &&
									paths.map((path, index) => (
										<div
											key={`${path}_${index}`}
											className='flex gap-2 flex-row items-center'>
											<BreadcrumbItem>
												<BreadcrumbLink
													href={`/${leadingPath}/${paths.slice(0, index + 1).join("/")}`}>
													{toSentenceCase(path)}
												</BreadcrumbLink>
											</BreadcrumbItem>
											{index < paths.length - 1 && <BreadcrumbSeparator />}
										</div>
									))}
								{/* <BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem> */}
							</BreadcrumbList>
						</Breadcrumb>
						<div className='absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium flex flex-row items-center gap-2 border border-outline px-2 py-1 rounded-md'>
							<div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
								{!currentProfile.profile?.customer ? (
									<Store className='size-4' />
								) : (
									<Factory className='size-4' />
								)}
							</div>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-medium'>
									{!currentProfile.profile
										? user.user.username
										: currentProfile.profile.customer}
								</span>
								<span className='truncate text-xs'>
									{!currentProfile.profile
										? user.user.username
										: currentProfile.profile.company}
								</span>
							</div>
						</div>
					</div>
				</header>
				<div className='flex-1 h-full w-full p-2 overflow-hidden'>
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
