import { materialRequestFields } from "@/constants";

import type { AxiosInstance, AxiosResponse } from "axios";
import type {
	CancelMaterialRequestDTO,
	CreateMaterialRequestDTO,
	DeleteMaterialRequestDTO,
	ListMaterialRequestDTO,
	ResendMaterialRequestDTO,
	SingleMaterialRequestDTO,
	SubmitMaterialRequestDTO,
} from "../dto";
import type {
	CreatedMaterialRequestModel,
	ReadMultipleMaterialRequestsModel,
	ReadSubmittedMaterialRequestModel,
	SingleMaterialRequestModel,
} from "../models";
import { FrappeInstance } from "./frappe";

export class MaterialRequest extends FrappeInstance {
	private docType: string;
	private materialRequestInstance: AxiosInstance;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.materialRequestInstance = this.getFrappeClient();
	}

	async retrieveMaterialRequests({
		warehouse,
		limit_page_length,
	}: ListMaterialRequestDTO) {
		const requests: AxiosResponse<ReadMultipleMaterialRequestsModel> =
			await this.materialRequestInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(materialRequestFields),
					limit: limit_page_length,
					order_by: "transaction_date desc",
					filters: JSON.stringify([
						["set_warehouse", "=", `${warehouse}`],
						["material_request_type", "=", "Material Transfer"],
					]),
				},
			});
		return requests.data.data;
	}

	//
	//Develop a method to show the number of items associated with an order
	async retrieveMaterialRequest({ material_req }: SingleMaterialRequestDTO) {
		const res: AxiosResponse<SingleMaterialRequestModel> =
			await this.materialRequestInstance.get(`${this.docType}/${material_req}`);
		return res.data.data;
	}

	async resendRequest({ name }: ResendMaterialRequestDTO) {
		const res = await this.materialRequestInstance.get(
			`${this.docType}/${name}`
		);
		return res.data.data;
	}

	async cancelRequest({ name }: CancelMaterialRequestDTO) {
		return await this.frappeCancel({ doctype: this.docType, name });
	}

	async deleteMaterialRequest({ name }: DeleteMaterialRequestDTO) {
		const res: AxiosResponse<{ data: "ok" }> =
			await this.materialRequestInstance.delete(`${this.docType}/${name}`);
		return res.data.data;
	}

	async createMaterialRequest({ data }: { data: CreateMaterialRequestDTO }) {
		const materialRequest: AxiosResponse<CreatedMaterialRequestModel> =
			await this.materialRequestInstance.post(this.docType, {
				data,
			});
		return materialRequest.data.data;
	}

	async submitMaterialRequest({ name }: SubmitMaterialRequestDTO) {
		const doc = await this.retrieveMaterialRequest({ material_req: name });
		const materialReq: AxiosResponse<ReadSubmittedMaterialRequestModel> =
			await this.frappeSubmit({ doc });
		return materialReq.data.message;
	}
}
