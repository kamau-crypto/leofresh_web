//

import type { AxiosInstance, AxiosResponse } from "axios";
import type { CreateBOMDTO, RetrieveBOMDto } from "../dto";
import type { RetrieveBOMModel } from "../models";
import { FrappeInstance } from "./frappe";

export class BOMDataSource extends FrappeInstance {
	private bomInstance: AxiosInstance;
	private docType: string;

	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.bomInstance = this.getFrappeClient();
	}
	//
	//Get a list of all BOM's
	async getAllBOMs({
		fields,
		limit_page_length,
		limit_start,
		order_by,
		default_source_warehouse,
		default_target_warehouse,
	}: RetrieveBOMDto) {
		const allBOMs: AxiosResponse<{ data: RetrieveBOMModel[] }> =
			await this.bomInstance.get(`/${this.docType}`, {
				params: {
					fields: JSON.stringify(fields),
					limit_page_length,
					limit_start,
					order_by,
					filter: JSON.stringify([
						["default_target_warehouse", "=", default_target_warehouse],
						["default_source_warehouse", "=", default_source_warehouse],
					]),
				},
			});
		return allBOMs.data.data;
	}

	async createBOM({ BOMData }: { BOMData: CreateBOMDTO }) {
		const newBOM: AxiosResponse<{ name: string }> = await this.bomInstance.post(
			`/${this.docType}`,
			{
				...BOMData,
			}
		);
		return newBOM.data.name;
	}

	async updateBOM({ name, BOMData }: { name: string; BOMData: CreateBOMDTO }) {
		const updatedBOM: AxiosResponse<{ name: string }> =
			await this.bomInstance.put(`/${this.docType}/${name}`, {
				...BOMData,
			});
		return updatedBOM;
	}
}
