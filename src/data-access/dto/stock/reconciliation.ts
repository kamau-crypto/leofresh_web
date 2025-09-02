export interface CreateStockReconciliationDTO {
	naming_series: string;
	purpose: string;
	set_warehouse: string;
	cost_center: string;
	company: string;
	posting_date: Date;
	posting_time: string;
	items: StockReconciliationItemDTO[];
}

export interface StockReconciliationItemDTO {
	item_name: string;
	warehouse: string;
	item_code: string;
	qty: number;
	valuation_rate: number;
}
