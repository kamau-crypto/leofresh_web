import type { CommonEntity } from "../common/common.entities";

export interface BOMListEntity {
	id: string;
	name: string;
	modified: string;
	is_default: number;
	is_active: number;
	default_source_warehouse: string;
	default_target_warehouse: string;
}

export interface GetBOMsFilterEntity extends CommonEntity {
	default_source_warehouse?: string;
	default_target_warehouse?: string;
}

export interface CreateBOMEntity {
	item: string;
	quantity: number;
	is_active: number;
	is_default: number;
	rm_cost_as_per: string;
	default_target_warehouse?: string;
	default_source_warehouse?: string;
	uom: string;
	items: CreateBOMItemEntity[];
	process_loss_percentage?: number;
	process_loss_qty?: number;
}

export interface CreateBOMItemEntity {
	item_code: string;
	uom: string;
	qty: number;
	rate: number;
}
