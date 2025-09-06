import { ItemPriceDataSource } from "@/data-access/api/item-price";
import type {
	ListItemsEntity,
	PurchaseItemEntity,
	SalesItemEntity,
} from "@/domain/entities";
import { appConfig } from "@/lib/config";

export interface IItemPriceRepository {
	retrieveSellingItemPrices: () => Promise<SalesItemEntity[]>;
	retrieveBuyingItemPrices: () => Promise<PurchaseItemEntity[]>;
	combineItemPrices: () => Promise<ListItemsEntity[]>;
}

export class ItemPriceRepository implements IItemPriceRepository {
	private itemPriceDataSource: ItemPriceDataSource;
	constructor() {
		this.itemPriceDataSource = new ItemPriceDataSource({ docType: "Item" });
	}

	async retrieveSellingItemPrices(): Promise<SalesItemEntity[]> {
		const response = await this.itemPriceDataSource.retrieveSellingItemPrices();
		// Implementation for retrieving selling item prices
		return response;
	}

	async retrieveBuyingItemPrices(): Promise<PurchaseItemEntity[]> {
		// Implementation for retrieving buying item prices
		const response = await this.itemPriceDataSource.retrieveBuyingItemPrices();
		return response;
	}

	async combineItemPrices() {
		const [sellingItems, buyingItems] = await Promise.all([
			this.retrieveSellingItemPrices(),
			this.retrieveBuyingItemPrices(),
		]);

		return this.mapToDomain({ sellingItems, buyingItems });
	}

	mapToDomain({
		sellingItems,
		buyingItems,
	}: {
		sellingItems: SalesItemEntity[];
		buyingItems: PurchaseItemEntity[];
	}): ListItemsEntity[] {

		return sellingItems.map(item => {
			return {
				//
				id: item.item_code,
				item_name: item.item_name,
				item_code: item.item_code,
				image: `${appConfig.PUBLIC_URL}${item.image}`,
				sellingPrice: item.price_list_rate,
				buyingPrice: buyingItems.find(
					buyingItem => buyingItem.item_name === item.item_name
				)?.price_list_rate,
				sellingUom: item.standard_selling_uom,
				buyingUom: buyingItems.find(
					buyingItem => buyingItem.item_name === item.item_name
				)!.standard_buying_uom,
				item_group: item.item_group,
				item_tax_template: item.item_tax_template,
				tax_rate: item.tax_rate,
				tax_type: item.tax_type,
			};
		});
	}
}
