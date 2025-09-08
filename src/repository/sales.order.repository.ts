import { SalesOrder } from "@/data-access/api/sales-order";
import type { SalesOrderFilterEntity, SalesOrderListEntity } from "@/domain";

export interface ISalesOrderRepository {
	listOrders({
		params,
	}: {
		params: Omit<SalesOrderFilterEntity, "fields">;
	}): Promise<SalesOrderListEntity[]>;
}

export class SalesOrderRepository implements ISalesOrderRepository {
	constructor() {}

	async listOrders({
		params,
	}: {
		params: Omit<SalesOrderFilterEntity, "fields">;
	}): Promise<SalesOrderListEntity[]> {
		const fields = [
			"name",
			"customer",
			"status",
			"grand_total",
			"modified",
			"creation",
			"transaction_date",
		];

		const orders = new SalesOrder({ docType: "Sales Order" });
		const orderList = await orders.retrieveSalesOrders({ ...params, fields });
		return this.mapToDomain({ orders: orderList });
	}

	mapToDomain({ orders }: { orders: any[] }): SalesOrderListEntity[] {
		return orders.map(order => ({
			id: order.name,
			...order,
		}));
	}
}
