import type { GetItemsDTO } from "@/data-access/dto";

interface IItemRepository {
	getFinishedProductsToSellOrBuy(fields: GetItemsDTO): Promise<void>;
	getNamingSeries(): Promise<{ naming_series: string }[]>;
}

/**
 * 
 * 
 * export enum ItemFieldsEnum {
	item_name = "item_name",
	item_code = "item_code",
	item_group = "item_group",
	standard_buying_uom = "standard_buying_uom",
	standard_selling_uom = "standard_selling_uom",
	image = "image",
}


 */

export class ItemRepository {
	constructor() {}

	getFinishedProductsToSellOrBuy(fields: GetItemsDTO): Promise<void> {
		// Implementation goes here
	}

	getNamingSeries(): Promise<void> {
		// Implementation goes here
	}
}
