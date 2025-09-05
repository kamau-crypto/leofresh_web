import { useAuth } from "@/components";
import { LeofreshError } from "@/lib/error";
import { extractFrappeErrorMessage } from "@/lib/frappe_error_handler";
import { UserProfileRepository } from "@/repository/profile.repository";
import { profileUseCase } from "@/use-cases/profile.use-case";
import { useQuery } from "@tanstack/react-query";

const fetchUserProfiles = async ({
	email,
	name,
}: {
	email: string;
	name: string;
}) => {
	//Call the frappe instance
	//Call the profileRepository
	const profile = new UserProfileRepository();
	//Call the profileUser Profile
	const profileCase = new profileUseCase(profile);
	try {
		return await profileCase.execute({ email, name });
	} catch (error) {
		const msg = extractFrappeErrorMessage(error);
		throw new LeofreshError({ message: msg });
	}
};

export function usePOSProfile() {
	const { user } = useAuth();
	const { data, error, isLoading } = useQuery({
		queryKey: ["user-profile", user?.user.email ?? user?.user.username],
		queryFn: () =>
			fetchUserProfiles({
				email: user?.user.email!,
				name: user?.user.username!,
			}),
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { data, isLoading };
}
