import { POSProfile } from "@/data-access/api/profile";
import type { ReadProfileModel } from "@/data-access/models";
import type { ReadProfileEntity } from "@/domain";

export interface ProfileRepository {
	retrievePOSProfile(email?: string): Promise<ReadProfileEntity[]>;
}

export class UserProfileRepository implements ProfileRepository {
	constructor() {}
	async retrievePOSProfile(email?: string): Promise<ReadProfileModel[]> {
		const profile = new POSProfile({ docType: "POS Profile" });
		return profile.retrievePOSProfile({ email: email ?? "" });
	}
}
