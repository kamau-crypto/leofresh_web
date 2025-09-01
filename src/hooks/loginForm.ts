import { useAuth } from "@/components/context/auth";
import { userLoginSchema, type UserLoginDTO } from "@/data-access";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useLoginForm = () => {
	const navigate = useNavigate();
	const { login } = useAuth();

	const form = useForm<UserLoginDTO>({
		resolver: zodResolver(userLoginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = async ({ password, username }: UserLoginDTO) => {
		try {
			await login({ password, username });

			toast.success("Login successful");
			navigate({ to: "/app", ignoreBlocker: true });
		} catch (error) {
			if (error instanceof Error) {
				form.setError("password", { message: "Invalid Credentials" });
				form.setError("username", { message: "Invalid Credentials" });
			}
		}
	};

	return { form, onSubmit };
};
