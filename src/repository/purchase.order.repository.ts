import { PurchaseOrderDataSource } from "@/data-access/api/purchase-order";
import type { RetrievePurchaseOrdersDTO } from "@/data-access/dto";
import type { PurchaseOrderListEntity } from "@/domain";

export interface IPurchaseOrderRepository {
	getAllPurchaseOrders: ({
		params,
	}: {
		params: RetrievePurchaseOrdersDTO;
	}) => Promise<PurchaseOrderListEntity[]>;
}

export class PurchaseOrderRepository implements IPurchaseOrderRepository {
	constructor() {}

	async getAllPurchaseOrders({
		params,
	}: {
		params: RetrievePurchaseOrdersDTO;
	}): Promise<PurchaseOrderListEntity[]> {
		const { limit_page_length, fields, cost_center, order_by, limit_start } =
			params;
		const purchaseOrders = new PurchaseOrderDataSource({
			docType: "Purchase Order",
		});
		const orders = await purchaseOrders.retrievePurchaseOrders({
			limit_page_length,
			fields,
			cost_center,
			order_by,
			limit_start,
		});

		return this.mapPurchaseOrdertoDomain({ orders });
	}

	mapPurchaseOrdertoDomain({
		orders,
	}: {
		orders: PurchaseOrderListEntity[];
	}): PurchaseOrderListEntity[] {
		return orders.map(order => ({
			id: order.name,
			...order,
		}));
	}
}
