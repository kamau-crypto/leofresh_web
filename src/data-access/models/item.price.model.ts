export interface SalesProductsModel {
	message: SalesMessageModel;
}

export interface SalesMessageModel {
	data: SalesItemsModel[];
}

export interface SalesItemsModel {
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

export interface PurchaseProductsModel {
	message: PurchaseMessageModel;
}

export interface PurchaseMessageModel {
	data: PurchaseItemsModel[];
}

export interface PurchaseItemsModel {
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

export interface PurchaseItemModel
	extends Omit<
		PurchaseItemsModel,
		"stock_uom" | "uom" | "conversion_factor" | ""
	> {
	standard_selling_uom: string | null;
	qty: number;
	item_tax_template: string | null;
}
