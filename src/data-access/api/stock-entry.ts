import type { AxiosInstance, AxiosResponse } from "axios";
import type { FrappeCreateRequirement } from "../common/frappe.create";
import type { CreateStockMovementEntryDTO } from "../dto";
import type { CreatedStockMovementModel } from "../models";
import { FrappeInstance } from "./frappe";

//Stock enty is a Stock Entry type of Material Transfer from the Stock Entry DocType
export class StockEntryDataSource
	extends FrappeInstance
	implements FrappeCreateRequirement
{
	private docType: string;
	private stockTransferInstance: AxiosInstance;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.stockTransferInstance = this.getFrappeClient();
	}

	async retrieveNamingSeries() {
		const naming_series: AxiosResponse<{ data: { naming_series: string } }> =
			await this.stockTransferInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(["naming_series"]),
					limit: 1,
				},
			});
		return naming_series.data.data;
	}

	async listStockTransfers() {
		const stockTransfers: AxiosResponse<{ data: CreatedStockMovementModel[] }> =
			await this.stockTransferInstance.get(this.docType, {
				params: {
					fields: JSON.stringify([fields]),
				},
			});
		return stockTransfers.data.data;
	}

	async createStockTransfer({ data }: { data: CreateStockMovementEntryDTO }) {
		const res: AxiosResponse<{ data: CreatedStockMovementModel }> =
			await this.stockTransferInstance.post(this.docType, { data });
		return res.data.data;
	}

	async submitStockTransfer({ data }: { data: CreatedStockMovementModel }) {
		const submitStock: AxiosResponse<{ message: CreatedStockMovementModel }> =
			await this.frappeSubmit({ doc: data });
		return submitStock.data.message;
	}

	async updateStockTransfer({
		data,
		name,
	}: {
		data: Partial<CreateStockMovementEntryDTO>;
		name: string;
	}) {
		const res: AxiosResponse<{ data: CreatedStockMovementModel }> =
			await this.stockTransferInstance.put(`${this.docType}/${name}`, { data });
		const submitted = await this.submitStockTransfer({ data: res.data.data });
		return submitted.name;
	}

	async transferStock({ data }: { data: CreateStockMovementEntryDTO }) {
		const transferStock = await this.createStockTransfer({ data });
		return await this.submitStockTransfer({ data: transferStock });
	}
}
