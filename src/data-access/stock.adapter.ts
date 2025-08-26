import type { StockRepository } from "@/repository";

// The adapter is the concrete implementation of the repository interface, actually handling the network operations.
export default class StockAdapter implements StockRepository {
	async getAllStocks(warehouse: string): Promise<Stock[]> {
		// Implementation for fetching all stocks from the API
	}

	async updateStock(warehouse: string): Promise<void> {
		// Implementation for updating stock in the API
	}
}
