import type {
	ListProductionItemEntity,
	MaterialsForProductionEntity,
} from "@/domain";
import { LeofreshError } from "@/lib/error";
import { extractFrappeErrorMessage } from "@/lib/frappe_error_handler";
import type { ItemRepository } from "@/repository/item.repository";
import { ProductionItemRepository } from "@/repository/production.item.repository";

export class ProductionItemUseCase {
	private productionItemRepository: ProductionItemRepository;
	private itemRepository: ItemRepository;

	constructor({
		productionRepo,
		itemRepo,
	}: {
		productionRepo: ProductionItemRepository;
		itemRepo: ItemRepository;
	}) {
		this.productionItemRepository = productionRepo;
		this.itemRepository = itemRepo;
	}

	async listAllProductionItems(): Promise<ListProductionItemEntity[]> {
		try {
			return this.productionItemRepository.listAllProductionItems();
		} catch (error) {
			throw new LeofreshError({
				message: extractFrappeErrorMessage({ error }),
			});
		}
	}

	async combineMaterialsForProduction(): Promise<{
		materials: MaterialsForProductionEntity[];
	}> {
		try {
			const productionItems = await this.listAllProductionItems();
			const salesItems = await this.itemRepository.listAllSalesItems({
				limit_page_length: 100,
			});

			const allMaterials = salesItems.map(salesItem => {
				const matchedItems = productionItems.filter(
					prodItem => prodItem.created_item === salesItem.item_code
				);
				if (matchedItems.length > 0) {
					return {
						...salesItem,
						production_items: matchedItems,
					};
				}
				return {
					...salesItem,
					production_items: [],
				};
			});
			const materials = allMaterials.filter(m => m.stock_uom === m.uom);

			return { materials };
		} catch (error) {
			throw new LeofreshError({
				message: extractFrappeErrorMessage({ error }),
			});
		}
	}
}
