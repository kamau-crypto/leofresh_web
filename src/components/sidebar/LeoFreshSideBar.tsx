import { toSentenceCase } from "@/lib/utils";
import { useLocation } from "@tanstack/react-router";
import { useAuth } from "../context";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export function LeoFreshSideBar({ children }: { children: React.ReactNode }) {
	const { api_token } = useAuth();
	const location = useLocation();

	const paths = location.pathname.split("/").filter(Boolean);
	const leadingPath = paths.length > 0 ? paths.shift() : "Home";

	//
	//[ ] Add the various profiles within the app at this stage

	if (!api_token) {
		return null;
	}
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
					<div className='flex items-center gap-2 px-4'>
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
								{paths.length > 0 && (
									<BreadcrumbItem>
										<BreadcrumbLink href={`${leadingPath}/${paths.join("/")}`}>
											{paths.join("/").toLocaleUpperCase()}
										</BreadcrumbLink>
									</BreadcrumbItem>
								)}
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className='flex flex-1 flex-col gap-4 p-4 pt-0'>{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
