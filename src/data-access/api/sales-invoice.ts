import type { AxiosInstance, AxiosResponse } from "axios";
import type {
	CancelSalesInvoice,
	CreateSalesInvoiceRecordDTO,
	DeleteSalesInvoice,
	RetreiveSalesInvoices,
	RetrieveSalesInvoice,
} from "../dto";
import type { PurchaseInvoiceResultModel, ResultInvoiceModel } from "../models";
import { FrappeInstance } from "./frappe";

export class SalesInvoice extends FrappeInstance {
	private salesInvoiceInstance: AxiosInstance;
	private salesDocType: string;
	constructor({ docType }: { docType: string }) {
		super();
		this.salesInvoiceInstance = this.getFrappeClient();
		this.salesDocType = docType;
	}

	async createSalesInvoice({ inv }: { inv: CreateSalesInvoiceRecordDTO }) {
		const createdInvoice = await this.salesInvoiceInstance.post(
			this.salesDocType,
			{
				...inv,
			}
		);
		return createdInvoice.data.data;
	}
	//
	async retrieveSalesInvoice({ name }: RetrieveSalesInvoice) {
		//  [ ] Confirm and countercheck this for the app
		const order: AxiosResponse<PurchaseInvoiceResultModel> =
			await this.salesInvoiceInstance.get(`${this.salesDocType}/${name}`);
		return order.data.data;
	}

	async submitSalesInvoice({ order }: { order: any }) {
		// const response: AxiosResponse<SubmitSalesInvoice> =
		const response = await this.frappeSubmit({ doc: order });
		return response.data;
	}

	async cancelSalesInvoice({ name }: CancelSalesInvoice) {
		const res = await this.frappeCancel({ doctype: this.salesDocType, name });
		return res;
	}
	async retrieveNamingSeries() {
		const naming_series: AxiosResponse<{ data: { naming_series: string } }> =
			await this.salesInvoiceInstance.get(this.salesDocType, {
				params: {
					fields: JSON.stringify(["naming_series"]),
					limit: 1,
				},
			});
		return naming_series.data.data;
	}

	async deleteSalesInvoice({ name }: DeleteSalesInvoice) {
		const res: AxiosResponse<{ data: "ok" }> =
			await this.salesInvoiceInstance.delete(`${this.salesDocType}/${name}`);
		return res.data.data;
	}

	//order the purchase invoices in descending order per project
	async retrieveSalesInvoices({
		limit_page_length,
		project,
		fields,
	}: RetreiveSalesInvoices) {
		const orders: AxiosResponse<{ data: ResultInvoiceModel[] }> =
			await this.salesInvoiceInstance.get(this.salesDocType, {
				params: {
					fields: JSON.stringify(fields),
					limit_page_length,
					filters: JSON.stringify([["project", "=", project]]),
					order_by: "name desc",
				},
			});
		return orders.data.data;
	}
}
