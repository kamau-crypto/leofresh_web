import { BinDataSource } from "@/data-access/api/bin";
import type { BinEntity, BinListFilterEntity, ListBinEntity } from "@/domain";

interface IBinRepository {
	getWarehouseBinData(params: BinListFilterEntity): Promise<ListBinEntity[]>;
	getBulkWaterBinData(params: BinListFilterEntity): Promise<ListBinEntity[]>;
}

export class BinRepository implements IBinRepository {
	private whBinDS: BinDataSource;
	constructor() {
		this.whBinDS = new BinDataSource({ docType: "Bin" });
	}

	async getWarehouseBinData(
		params: BinListFilterEntity
	): Promise<ListBinEntity[]> {
		const fields = [
			"item_code",
			"warehouse",
			"actual_qty",
			"reserved_qty",
			"projected_qty",
			"stock_uom",
		];
		const filters = [["warehouse", "like", params.warehouse]];
		const binData = await this.whBinDS.getWarehouseBinData({
			...params,
			fields,
			filters,
		});
		return this.maptoDomain(binData);
	}

	async getBulkWaterBinData(
		params: BinListFilterEntity
	): Promise<ListBinEntity[]> {
		const fields = [
			"item_code",
			"warehouse",
			"actual_qty",
			"reserved_qty",
			"projected_qty",
			"stock_uom",
		];

		const filters = [["warehouse", "like", params.warehouse]];
		const binData = await this.whBinDS.getWarehouseBinData({
			...params,
			fields,
			filters,
		});
		return this.maptoDomain(binData);
	}

	maptoDomain(bin: BinEntity[]): ListBinEntity[] {
		return bin.map(b => ({
			id: `${b.item_code}`,
			...b,
		}));
	}
}
