import type { PurchaseItemEntity } from "./item-price.entity";

export interface ListProductionItemEntity {
	created_item: string;
	item_name: string;
	qty: number;
}

export interface MaterialsForProductionEntity extends PurchaseItemEntity {
	production_items: ListProductionItemEntity[];
}
