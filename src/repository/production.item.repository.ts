import { ProductionItemDataSource } from "@/data-access/api/production-item";
import type { ListProductionItemEntity } from "@/domain";

export interface IProductionItemRepository {
	listAllProductionItems: () => Promise<ListProductionItemEntity[]>;
}

export class ProductionItemRepository implements IProductionItemRepository {
	private productionItemDataSource: ProductionItemDataSource;
	constructor() {
		this.productionItemDataSource = new ProductionItemDataSource({
			doctype: "Production Item",
		});
	}

	async listAllProductionItems(): Promise<ListProductionItemEntity[]> {
		const itemFields = [
			"created_item",
			"production_materials.item_name",
			"production_materials.qty",
		];
		return this.productionItemDataSource.listAllProductionItems({
			fields: itemFields,
		});
	}
}
