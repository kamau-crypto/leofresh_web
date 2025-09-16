import type { PaginationDTO, SortDTO } from "../common/pagination.dto";

export interface GetItemsDTO extends PaginationDTO, SortDTO {
	fields: string[];
}

export interface ListItemsDTO
	extends Pick<PaginationDTO, "limit_page_length" | "limit_start"> {
	filters: string[][];
	fields: string[];
}
