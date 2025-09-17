//

import type { AxiosInstance, AxiosResponse } from "axios";
import type {
	CancelBOMDTO,
	CreateBOMDTO,
	GetBOMDTO,
	RetrieveBOMDto,
	SubmitBOMDTO,
} from "../dto";
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
	// [ ] map Return Type
	async updateBOM({
		name,
		BOMData,
	}: {
		name: string;
		BOMData: Partial<CreateBOMDTO>;
	}) {
		const updatedBOM: AxiosResponse<{ name: string }> =
			await this.bomInstance.put(`/${this.docType}/${name}`, {
				...BOMData,
			});
		return updatedBOM.data;
	}
	// [ ] map Return Type
	async getBOM({ name }: GetBOMDTO) {
		return await this.bomInstance.get(`/${this.docType}/${name}`);
	}

	async submitBOM({ name }: SubmitBOMDTO) {
		const { data } = await this.getBOM({ name });
		return await this.frappeSubmit({ doc: data.data });
	}

	async cancelBOM({ name }: CancelBOMDTO) {
		return await this.frappeCancel({ doctype: this.docType, name });
	}
}
