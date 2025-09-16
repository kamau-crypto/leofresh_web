import { BOMDataSource } from "@/data-access/api/bom";
import type { BOMListEntity, GetBOMsFilterEntity } from "@/domain";

export interface IBomRepository {
	getAllBOMs(
		entities: Omit<GetBOMsFilterEntity, "fields">
	): Promise<BOMListEntity[]>;
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
}
