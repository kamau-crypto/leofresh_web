import { ItemsForSaleDataSource } from "@/data-access/api/item";
import type {
	ItemListEntity,
	ItemListFieldsEntity,
	PurchaseItemEntity,
} from "@/domain";

export interface IItemRepository {
	getAllItems(): Promise<ItemListEntity[]>;
	listAllSalesItems({
		limit_page_length,
	}: Omit<ItemListFieldsEntity, "fields">): Promise<PurchaseItemEntity[]>;
}

export class ItemRepository implements IItemRepository {
	private ItemDataSource: ItemsForSaleDataSource;
	constructor() {
		this.ItemDataSource = new ItemsForSaleDataSource({ docType: "Item" });
	}

	async getAllItems(): Promise<ItemListEntity[]> {
		const data = await this.ItemDataSource.getAllItems();
		return this.mapItemsToDomain({ items: data.data.data });
	}

	private mapItemsToDomain({
		items,
	}: {
		items: Pick<ItemListEntity, "name">[];
	}): ItemListEntity[] {
		return items.map(item => ({
			name: item.name,
			value: item.name,
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
			"stock_uom",
			"uoms",
			"uoms.conversion_factor",
			"uoms.uom",
			"image",
			"purchase_uom",
		];
		return await this.ItemDataSource.getFinishedProductsToSellOrBuy({
			fields: {
				fields,
				limit_page_length,
				limit_start: 0,
			},
		});
	}
}
