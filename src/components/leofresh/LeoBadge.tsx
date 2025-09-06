import { Badge } from "../ui/badge";

type HBLBadgeVariants = "default" | "success" | "error" | "warning" | "info";

export const LeoFreshBadge = ({
	children,
	variant = "default",
}: {
	variant: string;
	children: React.ReactNode;
}) => {
	const variants: Record<HBLBadgeVariants, string> = {
		default: "bg-slate-100 text-slate-800",
		success: "bg-green-100 text-green-800",
		error: "bg-red-100 text-red-800",
		warning: "bg-yellow-100 text-yellow-800",
		info: "bg-blue-100 text-blue-800",
	};

	return (
		<Badge
			className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant as HBLBadgeVariants]}`}>
			{children}
		</Badge>
	);
};

export const PIStatusBadge = ({ status }: { status: string }) => {
	const statusVariantMap: Record<string, HBLBadgeVariants> = {
		Draft: "default",
		Approved: "success",
		Rejected: "error",
		Pending: "warning",
		Completed: "info",
		Return: "warning",
		"Debit Note Issued": "info",
		Submitted: "default",
		Paid: "success",
		"Partly Paid": "warning",
		Unpaid: "error",
		Overdue: "error",
		Cancelled: "error",
		"Internal Transfer": "info",
	};

	return (
		<LeoFreshBadge variant={statusVariantMap[status] || "default"}>
			{status}
		</LeoFreshBadge>
	);
};
