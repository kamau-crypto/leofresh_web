import { ItemsForSaleDataSource } from "@/data-access/api/item";
import type { ItemListEntity } from "@/domain";

export interface IItemRepository {
	getAllItems(): Promise<ItemListEntity[]>;
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
}
