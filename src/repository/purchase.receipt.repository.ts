import { PurchaseReceiptDataSource } from "@/data-access/api/purchase-receipt";
import type {
	PurchaseReceiptsFilterEntity,
	PurchaseReceiptsListEntity,
} from "@/domain/entities/purchase/purchase.receipt.entity";

export interface IPurchaseReceiptRepository {
	getAllPurchaseReceipts({
		filter,
	}: {
		filter: Omit<PurchaseReceiptsFilterEntity, "fields">;
	}): Promise<PurchaseReceiptsListEntity[]>;
}

export class PurchaseReceiptRepository implements IPurchaseReceiptRepository {
	constructor() {}
	async getAllPurchaseReceipts({
		filter,
	}: {
		filter: Omit<PurchaseReceiptsFilterEntity, "fields">;
	}): Promise<PurchaseReceiptsListEntity[]> {
		const fields = [
			"name",
			"supplier",
			"status",
			"cost_center",
			"docstatus",
			"grand_total",
			"creation",
			"modified",
			"owner",
		];

		const dataSource = new PurchaseReceiptDataSource({
			docType: "Purchase Receipt",
		});
		return await dataSource.retrievePurchaseReceipts({ ...filter, fields });
	}
}
