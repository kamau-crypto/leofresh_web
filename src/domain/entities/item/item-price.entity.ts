export interface SalesItemEntity {
	item_name: string;
	item_code: string;
	item_group: string;
	standard_selling_uom: null | string;
	image: null | string;
	price_list_rate: number | null;
	price_list: null | string;
	item_tax_template: string | null;
	tax_rate: number | null;
	tax_type: string | null;
}

export interface PurchaseItemEntity {
	item_name: string;
	item_code: string;
	item_group: string;
	stock_uom: string;
	standard_buying_uom: string | null;
	uom: string;
	conversion_factor: number;
	image: null | string;
	price_list_rate: number | null;
	price_list: string | null;
}

export interface ListItemsEntity
	extends Omit<
		SalesItemEntity,
		"standard_selling_uom" | "price_list" | "price_list_rate"
	> {
	buyingPrice?: number | null;
	buyingUom?: string | null;
	sellingUom?: string | null;
}
