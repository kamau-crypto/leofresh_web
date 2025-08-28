import {
	CreateSalesInvoiceRecord,
	PurchaseInvoiceFieldsEnum,
	PurchaseInvoiceResult,
	ResultInvoice,
} from "@/constants";
import type { AxiosInstance, AxiosResponse } from "axios";
import { FrappeInstance } from "./frappe";

export class SalesInvoice extends FrappeInstance {
	private salesInvoiceInstance: AxiosInstance;
	private salesDocType: string;
	constructor({ docType }: { docType: string }) {
		super();
		this.salesInvoiceInstance = this.getFrappeClient();
		this.salesDocType = docType;
	}

	async createSalesInvoice({ inv }: { inv: CreateSalesInvoiceRecord }) {
		const createdInvoice = await this.salesInvoiceInstance.post(
			this.salesDocType,
			{
				...inv,
			}
		);
		return createdInvoice.data.data;
	}

	async retrieveSalesInvoice({ name }: { name: string }) {
		const order: AxiosResponse<PurchaseInvoiceResult> =
			await this.salesInvoiceInstance.get(`${this.salesDocType}/${name}`);
		return order.data.data;
	}

	async submitSalesInvoice({ order }: { order: any }) {
		// const response: AxiosResponse<SubmitSalesInvoice> =
		const response = await this.frappeSubmit({ doc: order });
		return response.data;
	}

	async cancelSalesInvoice({ name }: { name: string }) {
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

	async deleteSalesInvoice({ name }: { name: string }) {
		const res: AxiosResponse<{ data: "ok" }> =
			await this.salesInvoiceInstance.delete(`${this.salesDocType}/${name}`);
		return res.data.data;
	}

	//order the purchase invoices in descending order per project
	async retrieveSalesInvoices({
		page_length,
		project,
	}: {
		page_length: number;
		project: string;
	}) {
		const fields = ["mpesa_amount", "cash_amount"].concat(
			Object.values(PurchaseInvoiceFieldsEnum)
		);
		const orders: AxiosResponse<{ data: ResultInvoice[] }> =
			await this.salesInvoiceInstance.get(this.salesDocType, {
				params: {
					fields: JSON.stringify(fields),
					limit_page_length: page_length,
					filters: JSON.stringify([["project", "=", project]]),
					order_by: "name desc",
				},
			});
		return orders.data.data;
	}
}
