import type { ManufacturingMaterialsFieldsEntity } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { extractFrappeErrorMessage } from "@/lib/frappe_error_handler";
import { ItemRepository } from "@/repository";

export class ItemUseCase {
	private itemRepository: ItemRepository;
	constructor({ itemRepository }: { itemRepository: ItemRepository }) {
		this.itemRepository = itemRepository;
	}
	//
	//Get all items
	async getManufacturingItemsList({
		limit_page_length,
		limit_start,
	}: ManufacturingMaterialsFieldsEntity) {
		try {
			return await this.itemRepository.getAllManufacturingItems({
				limit_page_length,
				limit_start,
			});
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}

	async getItemsList({
		limit_page_length,
		limit_start,
	}: Omit<ManufacturingMaterialsFieldsEntity, "fields">) {
		try {
			return await this.itemRepository.getAllItems({
				limit_page_length,
				limit_start,
			});
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}
}
