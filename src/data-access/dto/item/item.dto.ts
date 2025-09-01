import type { PaginationDTO, SortDTO } from "../common/pagination.dto";

export interface GetItemsDTO extends PaginationDTO, SortDTO {
	fields: string[];
}
