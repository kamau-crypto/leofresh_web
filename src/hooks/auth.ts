import { AUTHMUTATIONKEY, AuthRepository } from "@/repository";
import { AuthUseCase } from "@/use-cases/auth.use-case";
import { useMutation } from "@tanstack/react-query";

// Implement the login logic properly at this stage...

export const useLoginMutation = () => {
	const {
		mutateAsync: loginUser,
		error,
		data,
	} = useMutation({
		mutationFn: async ({
			username,
			password,
		}: {
			username: string;
			password: string;
		}) => {
			const authRepo = new AuthRepository();
			return await authRepo.login({ username, password });
		},
		mutationKey: AUTHMUTATIONKEY.LOGIN_USER,
	});

	return { loginUser, error, data };
};

export function useIsAuthenticated() {
	const authRepo = new AuthRepository();
	const authUseCase = new AuthUseCase({ authRepo });
	return authUseCase.isAuthenticated();
}

// export const useLoginService = () => {
// 	const loginMutation = useLoginMutation();

// 	const login = async ({
// 		credentials: { password, username },
// 	}: {
// 		credentials: Login;
// 	}) => {
// 		// Use the mutation from the Data Layer to get the raw data
// 		const { message, success, user } = await loginMutation.mutateAsync({
// 			username,
// 			password,
// 		});

// 		if (loginMutation.error) {
// 			throw new LeofreshError({
// 				message: loginMutation.error.message,
// 			});
// 		}

// 		if (loginMutation.failureReason) {
// 			throw new LeofreshError({
// 				message: loginMutation.failureReason.message,
// 			});
// 		}
// 		// Here you can add domain-specific validation or logic
// 		if (!user || success !== 0) {
// 			throw new LeofreshError({
// 				message: "Authentication failed: Please try again",
// 			});
// 		}
// 		// Return the validated, clean domain data
// 		return { message, user };
// 	};

// 	return { login, isLoading: loginMutation.isPending };
// };
