import type { PaginationDTO, SortDTO } from "../common/pagination.dto";

export interface RetrieveSuppliersDTO extends PaginationDTO, SortDTO {
	fields: string[];
}
