import { PurchaseOrderDataSource } from "@/data-access/api/purchase-order";
import type { RetrievePurchaseOrdersDTO } from "@/data-access/dto";
import type { PurchaseOrderEntity } from "@/domain";

export interface IPurchaseOrderRepository {
	getAllPurchaseOrders: ({
		params,
	}: {
		params: RetrievePurchaseOrdersDTO;
	}) => Promise<PurchaseOrderEntity[]>;
}

export class PurchaseOrderRepository implements IPurchaseOrderRepository {
	constructor() {}

	async getAllPurchaseOrders({
		params,
	}: {
		params: RetrievePurchaseOrdersDTO;
	}): Promise<PurchaseOrderEntity[]> {
		const { limit_page_length, fields, cost_center, order_by, limit_start } =
			params;
		const purchaseOrders = new PurchaseOrderDataSource({
			docType: "Purchase Order",
		});
		return await purchaseOrders.retrievePurchaseOrders({
			limit_page_length,
			fields,
			cost_center,
			order_by,
			limit_start,
		});
	}
}
