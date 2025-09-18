import type { PaginationDTO, SortDTO } from "../common/common.dto";

export interface RetrieveSuppliersDTO extends PaginationDTO, SortDTO {
	fields: string[];
}
