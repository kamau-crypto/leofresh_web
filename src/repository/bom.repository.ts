import { BOMDataSource } from "@/data-access/api/bom";
import type { CancelBOMDTO } from "@/data-access/dto";
import type {
	BOMListEntity,
	CancelBOMEntity,
	CreateBOMEntity,
	GetBOMEntity,
	GetBOMsFilterEntity,
	SubmitBOMEntity,
	UpdateBOMEntity,
} from "@/domain";

export interface IBomRepository {
	getAllBOMs(
		entities: Omit<GetBOMsFilterEntity, "fields">
	): Promise<BOMListEntity[]>;
	getBOM(data: GetBOMEntity): Promise<BOMListEntity>;
	createBOM(data: CreateBOMEntity): Promise<string>;
	submitBOM(name: SubmitBOMEntity): Promise<void>;
	cancelBOM(name: CancelBOMEntity): Promise<{
		[key: string]: any;
	}>;
	updateBOM(data: UpdateBOMEntity): Promise<{ name: string }>;
}

export class BOMRepository implements IBomRepository {
	private bomDataSource: BOMDataSource;
	constructor() {
		this.bomDataSource = new BOMDataSource({ docType: "BOM" });
	}

	async getAllBOMs({
		default_source_warehouse,
		limit_page_length,
		limit_start,
		order_by,
		default_target_warehouse,
	}: Omit<GetBOMsFilterEntity, "fields">): Promise<BOMListEntity[]> {
		const fields: string[] = [
			"name",
			"modified",
			"is_default",
			"is_active",
			"docstatus",
			"default_source_warehouse",
			"default_target_warehouse",
		];

		const boms = await this.bomDataSource.getAllBOMs({
			fields,
			limit_page_length,
			limit_start,
			order_by,
			default_source_warehouse,
			default_target_warehouse,
		});

		return this.mapToDomain({ boms });
	}

	private mapToDomain({
		boms,
	}: {
		boms: Omit<BOMListEntity, "id">[];
	}): BOMListEntity[] {
		return boms.map(bom => ({
			id: bom.name,
			...bom,
		}));
	}

	async createBOM(bomData: CreateBOMEntity) {
		return await this.bomDataSource.createBOM({ BOMData: bomData });
	}

	async getBOM({ name }: GetBOMEntity): Promise<any> {
		return await this.bomDataSource.getBOM({ name });
	}

	async submitBOM({ name }: SubmitBOMEntity): Promise<void> {
		return await this.bomDataSource.submitBOM({ name });
	}
	async cancelBOM({ name }: CancelBOMDTO) {
		return await this.bomDataSource.cancelBOM({ name });
	}
	async updateBOM({ name, ...bomData }: UpdateBOMEntity) {
		return await this.bomDataSource.updateBOM({ name, BOMData: bomData });
	}
}
