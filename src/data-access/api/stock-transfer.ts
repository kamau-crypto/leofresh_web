import {
	CreatedStockMovement,
	CreateStockMovementEntry,
	FrappeCreateRequirement,
} from "@/constants";
import type { AxiosInstance, AxiosResponse } from "axios";
import { FrappeInstance } from "./frappe";

//Stock enty is a Stock Entry type of Material Transfer from the Stock Entry DocType
export class StockTransfer
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

	async createStockTransfer({ data }: { data: CreateStockMovementEntry }) {
		const res: AxiosResponse<{ data: CreatedStockMovement }> =
			await this.stockTransferInstance.post(this.docType, { data });
		return res.data.data;
	}

	async submitStockTransfer({ data }: { data: CreatedStockMovement }) {
		const submitStock: AxiosResponse<{ message: CreatedStockMovement }> =
			await this.frappeSubmit({ doc: data });
		return submitStock.data.message;
	}
	async transferStock({ data }: { data: CreateStockMovementEntry }) {
		const transferStock = await this.createStockTransfer({ data });
		return await this.submitStockTransfer({ data: transferStock });
	}
}
