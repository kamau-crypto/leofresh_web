import type { PaginationDTO, SortDTO } from "../common/common.dto";

export interface RetrieveSalesOrderDTO extends PaginationDTO, SortDTO {
	fields: string[];
	cost_center: string;
}
