//

import type { AxiosInstance, AxiosResponse } from "axios";
import {
	profileFieldsDTO,
	type ReadProfilesDTO,
} from "../dto/profile/profile.dto";
import type { ReadProfileModel } from "../models";
import { FrappeInstance } from "./frappe";

//Define a POS profile for the app

export class POSProfile extends FrappeInstance {
	private docType: string;
	private profileInstance: AxiosInstance;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.profileInstance = this.getFrappeClient();
	}

	// [ ] Move filters to the Repository for implementation after creating a DTO for the filters
	async retrievePOSProfile({ email }: Partial<ReadProfilesDTO>) {
		const data: AxiosResponse<{ data: ReadProfileModel[] }> =
			await this.profileInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(profileFieldsDTO),
					limit_page_length: 100,
					order_by: "customer asc",
				},
			});
		return data.data.data;
	}
}
