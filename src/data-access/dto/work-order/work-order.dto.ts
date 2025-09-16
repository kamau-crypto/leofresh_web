import type { PaginationDTO, SortDTO } from "../common/pagination.dto";

export interface GetWorkOrderDTO extends PaginationDTO, SortDTO {
	fields: string[];
	target_warehouse?: string;
	source_warehouse?: string;
}

export interface CreateWorkOrderDTO {
	fields: string[];
}
