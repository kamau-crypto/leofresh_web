import { POSProfile } from "@/data-access/api/profile";
import type { ReadProfileDTO } from "@/data-access/dto/profile/profile.dto";

export interface ProfileRepository {
	retrievePOSProfile(email?: string): Promise<ReadProfileDTO[]>;
}

export class UserProfileRepository implements ProfileRepository {
	constructor() {}
	async retrievePOSProfile(email?: string): Promise<ReadProfileDTO[]> {
		const profile = new POSProfile({ docType: "POS Profile" });
		return profile.retrievePOSProfile({ email });
	}
}
