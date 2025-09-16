import type { ManufacturingMaterialsFieldsEntity } from "@/domain";
import { ItemRepository } from "@/repository";

export class ItemUseCase {
	private itemRepository: ItemRepository;
	constructor({ itemRepository }: { itemRepository: ItemRepository }) {
		this.itemRepository = itemRepository;
	}
	//
	//Get all items
	async getItemsList({
		limit_page_length,
		limit_start,
	}: ManufacturingMaterialsFieldsEntity) {
		return this.itemRepository.getAllItems({
			limit_page_length,
			limit_start,
		});
	}
}
