import type { PaginationDTO, SortDTO } from "../common/common.dto";

export interface RetrieveBOMDto extends PaginationDTO, SortDTO {
	fields: string[];
	default_target_warehouse?: string;
	default_source_warehouse?: string;
}

export interface CreateBOMDTO {
	item: string;
	quantity: number;
	is_active: number;
	is_default: number;
	rm_cost_as_per: string;
	default_target_warehouse?: string;
	default_source_warehouse?: string;
	uom: string;
	items: CreateBOMItems[];
	process_loss_percentage?: number;
	process_loss_qty?: number;
}

interface CreateBOMItems {
	item_code: string;
	uom: string;
	qty: number;
	rate: number;
}

export interface CommonBOMDTO {
	name: string;
}

export interface UpdateBOMDTO extends Partial<CreateBOMDTO>, CommonBOMDTO {}
export interface GetBOMDTO extends CommonBOMDTO {}
export interface SubmitBOMDTO extends CommonBOMDTO {}
export interface CancelBOMDTO extends CommonBOMDTO {}
