import type { Login, UserLogged } from "@/domain";
import { useLoginService } from "@/domain/services/authService";
import { LeofreshError } from "@/lib/error";

type UserDetails = Pick<
	UserLogged,
	"username" | "email" | "roles" | "role_profiles"
>;
export interface LoggedInUser {
	message: string;
	user: UserDetails;
}

export const useLoginUseCase = () => {
	const { login, isLoading } = useLoginService();

	const loginUser = async (credentials: Login): Promise<LoggedInUser> => {
		try {
			const user: LoggedInUser = await login({ credentials });

			return { ...user };
		} catch (error) {
			throw new LeofreshError({ message: (error as Error).message });
		}
	};

	return { loginUser, isLoading };
};
