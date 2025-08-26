import { useAuth } from "@/components/leofresh/auth";
import { userLoginSchema, type UserLoginInput } from "@/data-access";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useLoginForm = () => {
	const navigate = useNavigate();
	const { login } = useAuth();

	const form = useForm<UserLoginInput>({
		resolver: zodResolver(userLoginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = async (data: UserLoginInput) => {
		try {
			await login(
                data.username
            );
			toast.success("Login successful");
			navigate({ to: "/" });
		} catch (error) {
			if (error instanceof Error) {
				form.setError("root", { message: error.message });
			}
		}
	};

	return { form, onSubmit };
};
