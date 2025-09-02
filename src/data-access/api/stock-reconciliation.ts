import type { AxiosInstance, AxiosResponse } from "axios";
import type { FrappeCreateRequirement } from "../common/frappe.create";
import type { CreateStockReconciliationDTO } from "../dto";
import type {
	CreatedStockReconciliationsModel,
	ReadStockReconiliationModel,
	RetrievedStockReconciliationModel,
	SubmittedStockReconciliationModel,
} from "../models";
import { FrappeInstance } from "./frappe";

//Stock Updates occur through a stock reconciliation
export class StockReconciliation
	extends FrappeInstance
	implements FrappeCreateRequirement
{
	private docType: string;
	private stockReconciliationInstance: AxiosInstance;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.stockReconciliationInstance = this.getFrappeClient();
	}

	async reconcile_stock({ data }: { data: CreateStockReconciliationDTO }) {
		const stock: AxiosResponse<CreatedStockReconciliationsModel> =
			await this.stockReconciliationInstance.post(this.docType, {
				data,
			});
		return stock.data.data;
	}

	async retrieveNamingSeries() {
		const naming_series: AxiosResponse<{ data: { naming_series: string } }> =
			await this.stockReconciliationInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(["naming_series"]),
					limit: 1,
				},
			});
		return naming_series.data.data;
	}

	async submit_stock_reconciliation({
		data,
	}: {
		data: CreateStockReconciliationDTO;
	}) {
		const stock = await this.reconcile_stock({ data });
		const submit: AxiosResponse<SubmittedStockReconciliationModel> =
			await this.frappeSubmit({
				doc: stock,
			});
		return submit.data.message;
	}

	async retrive_last_stock() {
		const stock_name: AxiosResponse<{
			data: RetrievedStockReconciliationModel[];
		}> = await this.stockReconciliationInstance.get(this.docType, {
			params: {
				fields: JSON.stringify(["name", "posting_date", "posting_time"]),
				filter: JSON.stringify([["cost_center", "=", "CC-SHOP1 - HF"]]),
				order_by: "name desc",
				limit: 1,
			},
		});
		const stock_items: AxiosResponse<{ data: ReadStockReconiliationModel }> =
			await this.stockReconciliationInstance.get(
				`${this.docType}/${stock_name.data.data[0].name}`
			);

		return stock_items.data.data;
	}
}
