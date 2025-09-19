import type { AxiosInstance, AxiosResponse } from "axios";
import type { BinDTO } from "../dto";
import type { BinModel } from "../models/bin.model";
import { FrappeInstance } from "./frappe";

export class BinDataSource extends FrappeInstance {
	private docType: string;
	private binInstance: AxiosInstance;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.binInstance = this.getFrappeClient();
	}

	async getWarehouseBinData({
		fields,
		limit_page_length,
		limit_start,
		order_by,
		filters,
	}: BinDTO): Promise<BinModel[]> {
		const res: AxiosResponse<{ data: BinModel[] }> = await this.binInstance.get(
			`/${this.docType}`,
			{
				params: {
					fields: JSON.stringify(fields),
					filters: JSON.stringify(filters),
					limit_page_length,
					limit_start,
					order_by,
				},
			}
		);
		return res.data.data;
	}
}
