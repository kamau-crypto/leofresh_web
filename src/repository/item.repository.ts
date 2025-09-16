import { ItemsForSaleDataSource } from "@/data-access/api/item";
import type {
	ItemListFieldsEntity,
	ListItemWithValueEntity,
	ManufactuatringItemListEntity,
	ManufacturingMaterialsFieldsEntity,
	PurchaseItemEntity,
} from "@/domain";

export interface IItemRepository {
	getAllItems(
		params: ManufacturingMaterialsFieldsEntity
	): Promise<ManufactuatringItemListEntity[]>;
	listAllSalesItems({
		limit_page_length,
	}: Omit<ItemListFieldsEntity, "fields">): Promise<PurchaseItemEntity[]>;
}

export class ItemRepository implements IItemRepository {
	private ItemDataSource: ItemsForSaleDataSource;
	constructor() {
		this.ItemDataSource = new ItemsForSaleDataSource({ docType: "Item" });
	}

	async getAllItems({
		limit_page_length,
		limit_start,
	}: ManufacturingMaterialsFieldsEntity): Promise<ListItemWithValueEntity[]> {
		const filters = [
			["item_group", "=", "Sub Assemblies"],
			["item_group", "=", "Raw Material"],
			["item_group", "=", "Leofresh Products"],
		];
		const fields = [
			"item_name",
			"image",
			"item_code",
			"item_group",
			"stock_uom",
			"valuation_rate",
			"uoms",
			"uoms.conversion_factor",
			"uoms.uom",
		];
		// const fields
		const response = await this.ItemDataSource.getAllItems({
			fields,
			filters,
			limit_page_length,
			limit_start,
		});
		return this.mapItemsToDomain({ items: response.data.data });
	}

	private mapItemsToDomain({
		items,
	}: {
		items: ManufactuatringItemListEntity[];
	}): ListItemWithValueEntity[] {
		return items.map(item => ({
			...item,
			value: item.item_name,
		}));
	}
	// GET ALL ITEMS that can be sold...
	async listAllSalesItems({
		limit_page_length,
	}: Omit<ItemListFieldsEntity, "fields">): Promise<PurchaseItemEntity[]> {
		const fields = [
			"item_name",
			"item_code",
			"item_group",
			"valuation_rate",
			"stock_uom",
			"uoms",
			"uoms.conversion_factor",
			"uoms.uom",
			"image",
			"purchase_uom",
		];
		//
		//Map to domain/ Compile a unique list of items where the UOM are grouped.
		return await this.ItemDataSource.getFinishedProductsToSellOrBuy({
			fields: {
				fields,
				limit_page_length,
				limit_start: 0,
			},
		});
	}
}
