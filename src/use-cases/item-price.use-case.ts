import type {
	ListItemsEntity,
	PurchaseItemEntity,
	SalesItemEntity,
} from "@/domain";
import type { IItemPriceRepository } from "@/repository/item-price.repository";

export class ItemPriceUseCase {
	private itemRepository: IItemPriceRepository;

	constructor({ itemRepository }: { itemRepository: IItemPriceRepository }) {
		this.itemRepository = itemRepository;
	}

	async getItemsWithPrices(): Promise<ListItemsEntity[]> {
		return await this.itemRepository.combineItemPrices();
	}

	async getItemBuyingPriceLists(): Promise<PurchaseItemEntity[]> {
		return await this.itemRepository.retrieveBuyingItemPrices();
	}

	async getItemSellingPriceLists(): Promise<SalesItemEntity[]> {
		return await this.itemRepository.retrieveSellingItemPrices();
	}
}
