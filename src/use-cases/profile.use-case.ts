import type { ProfileRepository } from "@/repository/profile.repository";

export class profileUseCase {
	private profileRepository: ProfileRepository;

	constructor(profileRepository: ProfileRepository) {
		this.profileRepository = profileRepository;
	}
	async execute(email?: string) {
		const profile = await this.profileRepository.retrievePOSProfile(email);
		return profile.filter(p => p.user_email === email);
	}
}
