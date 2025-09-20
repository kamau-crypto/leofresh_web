import type { PaginationDTO, SortDTO } from "../common/common.dto";

export interface BinDTO extends PaginationDTO, SortDTO {
	fields: string[];
}
