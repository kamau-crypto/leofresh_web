import type { PaginationDTO, SortDTO } from "../common/pagination.dto";

export interface RetrieveSalesOrderDTO extends PaginationDTO, SortDTO {
	fields: string[];
	cost_center: string;
}
