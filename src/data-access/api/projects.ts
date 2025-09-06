import { ProjectFields } from "@/constants";
import { ProjectKeysFields } from "@/store/project";
import type { AxiosInstance, AxiosResponse } from "axios";
import { FrappeInstance } from "./frappe";

export class Project extends FrappeInstance {
	private docType: string;
	private projectInstance: AxiosInstance;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.projectInstance = this.getFrappeClient();
	}

	async getProjects() {
		const response: AxiosResponse<{ data: ProjectKeysFields[] }> =
			await this.projectInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(Object.values(ProjectFields)),
					limit_page_legth: 20,
				},
			});
		return response.data.data;
	}
}
//
//Check out this and its implementation in ERPnext
