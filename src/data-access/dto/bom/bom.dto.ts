import type { PaginationDTO, SortDTO } from "../common/pagination.dto";

export interface RetrieveBOMDto extends PaginationDTO, SortDTO {
	fields: string[];
	default_target_warehouse?: string;
	default_source_warehouse?: string;
}

export interface CreateBOMDTO {
	item: string;
	is_default: number;
	is_active: number;
	default_target_warehouse?: string;
	default_source_warehouse?: string;
	rm_cost_as_per: string;
	process_loss_percentage: number;
	process_loss_qty: number;
	items: CreateBOMItems[];
}

interface CreateBOMItems {
	item_code: string;
	item_name: string;
	uom: string;
	qty: number;
	rate: number;
	conversion_factor: number;
	amount: number;
	include_item_in_manufacturing: number;
	is_stock_item: number;
}
