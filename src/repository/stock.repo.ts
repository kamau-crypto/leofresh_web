// The Repository layer isolates your application’s core logic from the specifics of data storage. Whether it’s a local database, a cloud service, or even browser storage, the repository hides the details.
export interface StockRepository {
	getAllStocks(warehouse: string): Promise<Stock[]>;
	updateStock(warehouse: string): Promise<void>;
}
