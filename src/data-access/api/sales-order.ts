import { FrappeCreateRequirement, SalesOrderEnum } from "@/constants";
import { AxiosInstance, AxiosResponse } from "axios";
import { FrappeInstance } from "./frappe";

type TypedSalesOrder = keyof typeof SalesOrderEnum;
export type TypedSalesOrders = { [key in TypedSalesOrder]: string };

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
	// [ ] Create a Sales Order method
	createSalesOrder() {
		const salesConstants = {
			naming_series: "SAL-ORD-.YYYY.-",
			order_type: "Sales",
			currency: "KES",
			selling_price_list: "Standard Selling",
		};
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

	async retrieveSalesOrders({ page_length }: { page_length: number }) {
		const orders: AxiosResponse<{ data: TypedSalesOrders[] }> =
			await this.salesOrderInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(Object.values(SalesOrderEnum)),
					limit_page_length: page_length,
				},
			});
		return orders.data.data;
	}

	async retrieveSalesOrder({ name }: { name: string }) {
		const order = await this.salesOrderInstance.get(`${this.docType}/${name}`);
		return order.data;
	}
}
