import { LeofreshError } from "@/lib/error";

export interface IPurchaseReceiptRepository {
	getAllPurchaseReceipts(): Promise<any[]>;
}

export class PurchaseReceiptRepository implements IPurchaseReceiptRepository {
	constructor() {}
	async getAllPurchaseReceipts(): Promise<any[]> {
		throw new LeofreshError({
			message: "Method not implemented. We cannot fetch all Purchase Receipts.",
		});
		return [];
	}
}
