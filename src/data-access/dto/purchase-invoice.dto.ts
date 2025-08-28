export interface CreatePurchaseInvoicesDTO {
	supplier: string;
	items: CreatePurchaseInvoiceItemDTO[];
	company: string;
	posting_date: Date;
	posting_time: string;
	update_stock: number;
}

export interface CreatePurchaseInvoiceItemDTO {
	item_code: string;
	qty: number;
	rate: number;
	purchase_order: string;
	purchase_receipt: string;
}
