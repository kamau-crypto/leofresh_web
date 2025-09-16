import type { CommonEntity } from "../common/common.entities";
import type { PurchaseItemEntity } from "./item-price.entity";

export interface ItemListFieldsEntity
	extends Pick<CommonEntity, "fields" | "limit_page_length"> {}

export interface AssociatedItemsEntity extends PurchaseItemEntity {
	associated_items: ListItemWithValueEntity[];
}

export interface CommonItemEntity {
	item_name: string;
	item_code: string;
	item_group: string;
	stock_uom: string;
	valuation_rate: string;
	uoms: string;
	image: string;
}

export interface ManufactuatringItemListEntity extends CommonItemEntity {
	conversion_factor: number;
	purchase_uom: string;
	uom: string;
}

export interface ListItemWithValueEntity extends ManufactuatringItemListEntity {
	value: string;
}

export interface ManufacturingMaterialsFieldsEntity
	extends Pick<CommonEntity, "limit_page_length" | "limit_start"> {}
