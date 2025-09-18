import type { PaginationDTO } from "../common/common.dto";

export interface ReadExpensesDTO {
	limit: number;
	cost_center: string;
}

export interface ReadExpenseAccountsDTO
	extends Pick<PaginationDTO, "limit_page_length"> {}
