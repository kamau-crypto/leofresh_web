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
		const response = await loginMutation.mutateAsync({ username, password });

		// Here you can add domain-specific validation or logic
		if (!response.user || !response.user.full_name) {
			throw new LeofreshError({
				message: "Authentication failed: No token received.",
			});
		}
		// Return the validated, clean domain data
		return response.user;
	};

	return { login, isLoading: loginMutation.isPending };
};

//  Work on the clean architecture API for this functionality
