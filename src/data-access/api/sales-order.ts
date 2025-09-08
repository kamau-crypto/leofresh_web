import type { AxiosInstance, AxiosResponse } from "axios";
import type { FrappeCreateRequirement } from "../common/frappe.create";
import type { RetrieveSalesOrderDTO } from "../dto";
import type { RetrieveSalesOrdersModel } from "../models";
import { FrappeInstance } from "./frappe";
export class SalesOrder
	extends FrappeInstance
	implements FrappeCreateRequirement
{
	private salesOrderInstance: AxiosInstance;
	private docType: string;
	constructor({ docType }: { docType: string }) {
		super();
		this.salesOrderInstance = this.getFrappeClient();
		this.docType = docType;
	}
	// [ ] Create a Sales Order method. TODO
	createSalesOrder() {
		// const _salesConstants = {
		// 	naming_series: "SAL-ORD-.YYYY.-",
		// 	order_type: "Sales",
		// 	currency: "KES",
		// 	selling_price_list: "Standard Selling",
		// };
		throw new Error("This method is not implemented yet");
	}

	submitSalesOrder() {
		throw new Error("This method is not implemented yet");
	}

	async retrieveNamingSeries() {
		const naming_series: AxiosResponse<{ data: { naming_series: string } }> =
			await this.salesOrderInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(["naming_series"]),
					limit: 1,
				},
			});
		return naming_series.data.data;
	}

	async retrieveSalesOrders({
		limit_page_length,
		fields,
		cost_center,
		limit_start,
		order_by,
	}: RetrieveSalesOrderDTO) {
		const orders: AxiosResponse<{ data: RetrieveSalesOrdersModel[] }> =
			await this.salesOrderInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(fields),
					filters: JSON.stringify([["cost_center", "=", cost_center]]),
					limit_page_length,
					limit_start,
					order_by,
				},
			});
		return orders.data.data;
	}

	async retrieveSalesOrder({ name }: { name: string }) {
		const order = await this.salesOrderInstance.get(`${this.docType}/${name}`);
		return order.data;
	}
}
