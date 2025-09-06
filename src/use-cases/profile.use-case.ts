import { LeofreshError } from "@/lib/error";
import { extractFrappeErrorMessage } from "@/lib/frappe_error_handler";
import type { ProfileRepository } from "@/repository/profile.repository";

export class profileUseCase {
	private profileRepository: ProfileRepository;

	constructor(profileRepository: ProfileRepository) {
		this.profileRepository = profileRepository;
	}
	async execute({ email, name }: { email?: string; name?: string }) {
		try {
			const profile = await this.profileRepository.retrievePOSProfile(email);
			return profile.filter(
				p =>
					p.user_email.toLowerCase() === email ||
					p.user_email.toLowerCase() === name
			);
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}
}
