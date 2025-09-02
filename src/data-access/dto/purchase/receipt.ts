export interface CreatePurchaseReceiptDTO {
	supplier: string;
	items: PurchaseReceiptItemsDTO[];
	company: string;
	posting_date: string;
	supplier_delivery_note: string;
	lr_no: string;
	transporter_name: string;
}

export interface PurchaseReceiptItemsDTO {
	item_code: string;
	item_name: string;
	purchase_order_item: string;
	qty: number;
	rate: number;
	against_purchase_order: string;
	purchase_order: string;
	warehouse: string;
}
