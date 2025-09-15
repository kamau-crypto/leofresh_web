import type { AssociatedItemsEntity, ItemListFieldsEntity } from "@/domain";
import { ItemRepository } from "@/repository";

export class ItemUseCase {
	private itemRepository: ItemRepository;
	constructor({ itemRepository }: { itemRepository: ItemRepository }) {
		this.itemRepository = itemRepository;
	}
	//
	//Get all itemss
	async getItemsList() {
		return this.itemRepository.getAllItems();
	}
	//
	//	// get the items involved in manufacturing and use them to construct an object of all the necessary details. For example, item name, quantity, uom, cost price etc. Include even the raw materials needed in the manufacturing plants.
	async compileItemListData({
		limit_page_length,
	}: Omit<ItemListFieldsEntity, "fields">): Promise<AssociatedItemsEntity[]> {
		const salesItems = await this.itemRepository.listAllSalesItems({
			limit_page_length,
		});
		const allItems = await this.itemRepository.getAllItems();

		return salesItems.map(salesItems => {
			const matchedItems = allItems.filter(item =>
				salesItems.item_name.includes(item.name)
			);
			if (matchedItems.length > 0) {
				return {
					...salesItems,
					associated_items: matchedItems,
				};
			}
			return {
				...salesItems,
				associated_items: [],
			};
		});
	}
}
