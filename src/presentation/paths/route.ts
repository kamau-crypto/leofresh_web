import {
	BadgeDollarSign,
	BanknoteArrowUp,
	BookA,
	LayoutDashboard,
	ListOrdered,
	Receipt,
	ShoppingBasket,
	Siren,
	UsersRound,
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
				title: "Returns",
				url: "/app/sales/invoice",
				icon: Receipt,
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
		],
	},
	{
		title: "Purchases",
		url: "/app/purchases",
		icon: ShoppingBasket,
		isActive: false,
		isOpen: true,
		items: [
			{
				title: "Order",
				url: "/app/purchases/orders",
				icon: BookA,
			},
		],
	},
	{
		title: "Customers",
		url: "/app/customers",
		icon: UsersRound,
		isActive: false,
	},
];
