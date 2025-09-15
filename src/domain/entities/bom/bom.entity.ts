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

export interface CreateBOMEntity {}
