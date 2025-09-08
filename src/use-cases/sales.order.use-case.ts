import type { SalesOrderFilterEntity, SalesOrderListEntity } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { extractFrappeErrorMessage } from "@/lib/frappe_error_handler";
import type { SalesOrderRepository } from "@/repository/sales.order.repository";

export class SalesOrderUseCase {
	private salesOrderRepository: SalesOrderRepository;
	constructor(salesOrderRepository: SalesOrderRepository) {
		this.salesOrderRepository = salesOrderRepository;
	}

	async listOrders({
		params,
	}: {
		params: Omit<SalesOrderFilterEntity, "fields">;
	}): Promise<SalesOrderListEntity[]> {
		try {
			return await this.salesOrderRepository.listOrders({ params });
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}
}
