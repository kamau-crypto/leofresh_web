import type { Login, UserLogged } from "@/domain";
import { useLoginService } from "@/domain/services/authService";
import { LeofreshError } from "@/lib/error";

interface LoggedInUser
	extends Pick<UserLogged, "username" | "email" | "roles" | "role_profiles"> {}

export const useLoginUseCase = () => {
	const { login, isLoading } = useLoginService();

	const loginUser = async (credentials: Login): Promise<LoggedInUser> => {
		try {
			const user = await login({ credentials });
			console.log("Login successful! User:", user);

			return { ...user };
		} catch (error) {
			throw new LeofreshError({ message: (error as Error).message });
		}
	};

	return { loginUser, isLoading };
};
