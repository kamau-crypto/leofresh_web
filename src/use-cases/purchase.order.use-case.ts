import type { PurchaseOrderFilterEntity } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { extractFrappeErrorMessage } from "@/lib/frappe_error_handler";
import type { PurchaseOrderRepository } from "@/repository/purchase.order.repository";

export class PurchaseOrderUseCase {
	private purchaseOrderRepository: PurchaseOrderRepository;
	constructor({ repo }: { repo: PurchaseOrderRepository }) {
		this.purchaseOrderRepository = repo;
	}

	async getAllPurchaseOrders({
		params,
	}: {
		params: Omit<PurchaseOrderFilterEntity, "fields">;
	}) {
		try {
			const fields = [
				"name",
				"company",
				"supplier",
				"transaction_date",
				"schedule_date",
				"status",
				"project",
				"buying_price_list",
				"per_received",
				"total",
				"grand_total",
				"advance_paid",
				"cost_center",
				"currency",
				"items",
				"modified",
			];
			return await this.purchaseOrderRepository.getAllPurchaseOrders({
				params: { ...params, fields },
			});
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}
	//
	//Return the details about a purchase order
	getPurchaseOrderDetails({ name }: { name: string }) {
		return name;
	}

	//Create a new purchase order
	createPurchaseOrder() {
		return;
	}
}
