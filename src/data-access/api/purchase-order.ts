import type { AxiosInstance, AxiosResponse } from "axios";
import type { FrappeCreateRequirement } from "../common/frappe.create";
import type {
	CancelPurchaseOrderDTO,
	DeletePurchaseOrderDTO,
	ResendPurchaseOrderDTO,
	RetrievePurchaseOrderDTO,
	RetrievePurchaseOrdersDTO,
	SubmitPurchaseOrderDTO,
	UpdatePurchaseOrderDTO,
} from "../dto";
import type { GetPurchaseOrderModel } from "../models";
import { FrappeInstance } from "./frappe";

export interface RetrievedPurchaseOrders {
	data: ReturnedPurchaseOrder[];
}

export interface ReturnedPurchaseOrder {
	name: string;
	company: string;
	supplier: string;
	transaction_date: string;
	schedule_date: Date;
	status: string;
	project: null;
	buying_price_list: string;
	total: number;
	grand_total: number;
	advance_paid: number;
	cost_center: null | string;
	currency: string;
	per_received: number;
	creation: string;
}

export class PurchaseOrder
	extends FrappeInstance
	implements FrappeCreateRequirement
{
	private purchaseOrderInstance: AxiosInstance;
	private docType: string;
	constructor({ docType }: { docType: string }) {
		super();
		this.purchaseOrderInstance = this.getFrappeClient();
		this.docType = docType;
	}

	async createPurchaseOrder({
		order,
	}: {
		order: RetrievePurchaseOrdersDTO;
	}): Promise<{ data: GetPurchaseOrderModel }> {
		const response = await this.purchaseOrderInstance.post(
			this.docType,
			JSON.stringify(order)
		);
		return response.data;
	}

	async retrievePurchaseOrders({
		limit_page_length,
		cost_center,
		fields,
		order_by,
	}: RetrievePurchaseOrdersDTO) {
		const response: AxiosResponse<RetrievedPurchaseOrders> =
			await this.purchaseOrderInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(fields),
					limit: limit_page_length,
					filters: JSON.stringify([["cost_center", "=", `${cost_center}`]]),
					order_by,
				},
			});
		return response.data.data;
	}

	async retrieveNamingSeries() {
		const naming_series: AxiosResponse<{ data: { naming_series: string } }> =
			await this.purchaseOrderInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(["naming_series"]),
					limit: 1,
				},
			});
		return naming_series.data.data;
	}

	async retrievePurchaseOrder({ name }: RetrievePurchaseOrderDTO) {
		const response: AxiosResponse<{ data: GetPurchaseOrderModel }> =
			await this.purchaseOrderInstance.get(`${this.docType}/${name}`);
		return response.data.data;
	}

	async submitPurchaseOrder({ name }: SubmitPurchaseOrderDTO) {
		const order = await this.retrievePurchaseOrder({
			name,
		});
		const response = await this.frappeSubmit({ doc: order });
		return response.data;
	}

	async cancelPurchaseOrder({ name }: CancelPurchaseOrderDTO) {
		const res = await this.frappeCancel({ doctype: this.docType, name });
		return res;
	}

	async deletePurchaseOrder({ name }: DeletePurchaseOrderDTO) {
		const res: AxiosResponse<{ data: "ok" }> =
			await this.purchaseOrderInstance.delete(`${this.docType}/${name}`);
		return res.data.data;
	}

	async resendPurchaseOrder({ name }: ResendPurchaseOrderDTO) {
		const order = await this.retrievePurchaseOrder({ name });

		return order;
	}

	async updatePurchaseOrder({ name, data }: UpdatePurchaseOrderDTO) {
		const updatedOrder: AxiosResponse<any> =
			await this.purchaseOrderInstance.put(`${this.docType}/${name}`, data);
		return updatedOrder.data;
	}
}
