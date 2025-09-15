import type { GetBOMsFilterEntity } from "@/domain";
import type { IBomRepository } from "@/repository/";

export class BOMUseCase {
	private bomRepository: IBomRepository;
	constructor({ bomRepository }: { bomRepository: IBomRepository }) {
		this.bomRepository = bomRepository;
	}
	async getBOMs({ params }: { params?: Omit<GetBOMsFilterEntity, "fields"> }) {
		const bomsParams = !params
			? {
					limit_page_length: 20,
					limit_start: 0,
					order_by: "modified asc",
				}
			: params;
		return this.bomRepository.getAllBOMs({ ...bomsParams });
	}

	// async createBOM({data}: )
	// get the items involved in manufacturing and use them to construct an object of all the necessary details. For example, item name, quantity, uom, cost price etc.
	async compileItemListData(){}
}
