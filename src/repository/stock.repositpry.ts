import { StockEntryDataSource } from "@/data-access/api/stock-entry";

// The Repository layer isolates your application’s core logic from the specifics of data storage. Whether it’s a local database, a cloud service, or even browser storage, the repository hides the details.
export interface IStockRepository {
	listStockTransfers(): Promise<any>;
	transferStock(data: any): Promise<any>;
	updateStockTransfer(name: string, data: any): Promise<any>;
}

export class StockRepository implements IStockRepository {
	private stockTransfer: StockEntryDataSource;
	constructor() {
		this.stockTransfer = new StockEntryDataSource({ docType: "Stock Entry" });
	}

	async listStockTransfers(): Promise<any> {
		return await this.stockTransfer.listStockTransfers();
	}

	async transferStock(data: any): Promise<any> {
		return await this.stockTransfer.transferStock({ data });
	}

	async updateStockTransfer(name: string, data: any): Promise<any> {
		return await this.stockTransfer.updateStockTransfer({ name, data });
	}
}
