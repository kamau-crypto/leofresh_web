import { Button } from "../ui/button";

// Base UI Components
type ButtonVariant = "default" | "outline" | "ghost" | "secondary";
type ButtonSize = "default" | "sm" | "icon";

interface LeoButtonProps extends React.ComponentProps<"button"> {
	children: React.ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
}

export const LeoButton = (props: LeoButtonProps) => {
	const {
		children,
		variant = "default",
		size = "default",
		className = "",
		onClick,
		disabled,
		...rest
	} = props;
	const baseClasses =
		"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

	const variants: Record<ButtonVariant, string> = {
		default: "bg-primary text-slate-50 hover:bg-slate-900/90",
		outline:
			"border border-primary/90 text-primary bg-white hover:bg-slate-200 hover:bg-primary/80 hover:text-white",
		ghost: "hover:bg-slate-100 hover:text-slate-900",
		secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
	};

	const sizes: Record<ButtonSize, string> = {
		default: "h-10 px-4 py-2",
		sm: "h-9 px-3",
		icon: "h-10 w-10",
	};

	return (
		<Button
			className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
			onClick={onClick}
			disabled={disabled}
			{...rest}>
			{children}
		</Button>
	);
};
