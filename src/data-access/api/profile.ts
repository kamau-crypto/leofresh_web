//

import type { AxiosInstance, AxiosResponse } from "axios";
import {
	profileFieldsDTO,
	type ReadProfileDTO,
} from "../dto/profile/profile.dto";
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

	async retrievePOSProfile({ email }: { email?: string }) {
		const data: AxiosResponse<{ data: ReadProfileDTO[] }> =
			await this.profileInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(profileFieldsDTO),
					limit_page_length: 200,
					order_by: "customer asc",
				},
			});
		return data.data.data;
	}
}
