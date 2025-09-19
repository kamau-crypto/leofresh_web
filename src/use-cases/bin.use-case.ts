import type { BinListFilterEntity, DetailedListBinEntity } from "@/domain";
import { appConfig } from "@/lib/config";
import { LeofreshError } from "@/lib/error";
import { extractFrappeErrorMessage } from "@/lib/frappe_error_handler";
import { ItemRepository, type BinRepository } from "@/repository";
import { ItemUseCase } from "./item.use-case";

export class BinUseCase {
	private binRepo: BinRepository;

	constructor(binRepo: BinRepository) {
		this.binRepo = binRepo;
	}

	async getWarehouseBinData(
		params: BinListFilterEntity
	): Promise<DetailedListBinEntity[]> {
		try {
			const itemsRepo = new ItemRepository();
			const itemUseCase = new ItemUseCase({ itemRepository: itemsRepo });

			const allItems = await itemUseCase.getItemsList({
				limit_page_length: 1000,
				limit_start: 0,
			});
			const binItems = await this.binRepo.getWarehouseBinData(params);

			return binItems.map(binItem => {
				const detailedItem = allItems.find(
					item => item.item_code === binItem.item_code
				);
				return {
					...binItem,
					image: detailedItem?.image
						? `${appConfig.PUBLIC_URL}${detailedItem.image}`
						: undefined,
					item_group: detailedItem?.item_group || "Unknown",
				};
			});
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}

	async getBulkWaterBinData(params: BinListFilterEntity) {
		try {
			return await this.binRepo.getBulkWaterBinData(params);
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}
}
