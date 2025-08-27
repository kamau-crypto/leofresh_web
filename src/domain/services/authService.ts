import { LeofreshError } from "@/lib/error";
import { useLoginMutation } from "@/repository/auth";
import type { Login } from "../entities";

export const useLoginService = () => {
	const loginMutation = useLoginMutation();

	const login = async ({
		credentials: { password, username },
	}: {
		credentials: Login;
	}) => {
		// Use the mutation from the Data Layer to get the raw data
		const { message, success, user } = await loginMutation.mutateAsync({
			username,
			password,
		});

		// Here you can add domain-specific validation or logic
		if (!user || success !== 0) {
			throw new LeofreshError({
				message: "Authentication failed: Please try again",
			});
		}
		// Return the validated, clean domain data
		return { message, user };
	};

	return { login, isLoading: loginMutation.isPending };
};

//  Work on the clean architecture API for this functionality
