import type { PaginationDTO, SortDTO } from "../common/pagination.dto";

export interface ListMaterialRequestDTO extends PaginationDTO, SortDTO {
	warehouse: string;
	material_request_type: string;
}

export type SingleMaterialRequestDTO = {
	material_req: string;
};

export type ResendMaterialRequestDTO = {
	name: string;
};

export type CancelMaterialRequestDTO = ResendMaterialRequestDTO;
export type DeleteMaterialRequestDTO = ResendMaterialRequestDTO;
export type SubmitMaterialRequestDTO = ResendMaterialRequestDTO;

export interface CreateMaterialRequestDTO {
	material_request_type: string;
	company: string;
	schedule_date: Date;
	set_from_warehouse: string;
	set_warehouse: string;
	items: CreateMaterialRequestItemDTO[];
	purpose: string;
}

export interface CreateMaterialRequestItemDTO {
	item_name: string;
	item_code: string;
	qty: number;
	uom: string;
	from_warehouse: string;
	warehouse: string;
	schedule_date: string;
}
