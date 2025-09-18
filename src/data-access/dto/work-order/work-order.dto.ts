import type { PaginationDTO, SortDTO } from "../common/common.dto";

export interface GetWorkOrderDTO extends PaginationDTO, SortDTO {
	fields: string[];
	target_warehouse?: string;
	source_warehouse?: string;
}
export interface CommonWorkOrderDTO {
	name: string;
}

export interface CreateWorkOrderDTO {
	data: string[];
}

export interface UpdateWorkOrderDTO extends Partial<CreateWorkOrderDTO> {}
export interface UpdateWorkOrderDTO
	extends CommonWorkOrderDTO,
		Partial<CreateWorkOrderDTO> {}

export interface CancelWorkOrderDTO extends CommonWorkOrderDTO {}
export interface GetWorkOrderDetailsDTO extends CommonWorkOrderDTO {}
