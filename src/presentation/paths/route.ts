import {
	BadgeDollarSign,
	BanknoteArrowUp,
	Barrel,
	BookCheck,
	BookOpenCheck,
	CalendarArrowDown,
	Container,
	Factory,
	HandCoins,
	LayoutDashboard,
	ListOrdered,
	Milk,
	Package,
	ShoppingCart,
	Siren,
	TableOfContents,
	Truck,
	UsersRound,
	Wallet,
	Warehouse,
	type LucideProps,
} from "lucide-react";

interface RouteItems {
	title: string;
	url: string;
	icon?: React.ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
	>;
}
export interface Route {
	title: string;
	url: string;
	icon: React.ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
	>;
	isActive?: boolean;
	isOpen?: boolean;
	items?: RouteItems[];
}

export const leofreshRoutes: Route[] = [
	{
		title: "Dashboard",
		url: "/app/dashboard",
		icon: LayoutDashboard,
		isActive: true,
	},
	{
		title: "Sales",
		url: "/app/sales",
		icon: BadgeDollarSign,
		isActive: false,
		isOpen: true,
		items: [
			{
				title: "POS",
				url: "/app/sales/pos",
				icon: BanknoteArrowUp,
			},
			{
				title: "Order",
				url: "/app/sales/orders",
				icon: ListOrdered,
			},
			{
				title: "Invoice",
				url: "/app/sales/invoice",
				icon: HandCoins,
			},
		],
	},
	{
		title: "Stock",
		url: "/app/stock",
		icon: Warehouse,
		isActive: false,
		isOpen: true,
		items: [
			{
				title: "Balance",
				url: "/app/stock/balance",
				icon: Siren,
			},
			{
				title: "Bulk",
				url: "/app/stock/bulk",
				icon: Barrel,
			},
			{
				title: "Adjust",
				url: "/app/stock/adjust",
				icon: BookOpenCheck,
			},
		],
	},
	{
		title: "Purchases",
		url: "/app/purchases",
		icon: ShoppingCart,
		isActive: false,
		isOpen: true,
		items: [
			{
				title: "Order",
				url: "/app/purchases/orders",
				icon: CalendarArrowDown,
			},
			{
				title: "Receive",
				url: "/app/purchases/receipt",
				icon: Truck,
			},
			{
				title: "Invoice",
				url: "/app/purchases/invoice",
				icon: BookCheck,
			},
			{
				title: "Suppliers",
				url: "/app/purchases/supplier",
				icon: Container,
			},
		],
	},
	{
		title: "Customers",
		url: "/app/customers",
		icon: UsersRound,
		isActive: false,
	},
	{
		title: "Items",
		url: "/app/items",
		icon: Milk,
		isActive: false,
	},
	{
		title: "Expenses",
		url: "/app/expenses",
		icon: Wallet,
		isActive: false,
	},
	{
		title: "Manufacturing",
		url: "/app/manufacturing",
		icon: Factory,
		isActive: false,
		isOpen: true,
		items: [
			{
				title: "BOM",
				url: "/app/manufacturing/bom",
				icon: TableOfContents,
			},
			{
				title: "Work Orders",
				url: "/app/manufacturing/work-orders",
				icon: Package,
			},
		],
	},
];
