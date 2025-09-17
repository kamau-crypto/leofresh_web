import type {
	CancelBOMEntity,
	CreateBOMEntity,
	GetBOMsFilterEntity,
	SubmitBOMEntity,
	UpdateBOMEntity,
} from "@/domain";
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
	async getBOM(name: string) {
		return this.bomRepository.getBOM({ name });
	}

	async createBOM(bomData: CreateBOMEntity) {
		return this.bomRepository.createBOM(bomData);
	}
	async submitBOM({ name }: SubmitBOMEntity) {
		return this.bomRepository.submitBOM({ name });
	}
	async cancelBOM({ name }: CancelBOMEntity) {
		return this.bomRepository.cancelBOM({ name });
	}
	async updateBOM({ name, ...bomData }: UpdateBOMEntity) {
		return this.bomRepository.updateBOM({ name, ...bomData });
	}
}
