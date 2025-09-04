import type { PaginationDTO, SortDTO } from "../dto";
export interface ReadWarehouseDTO {
	name: string;
	company: string;
	account: null;
}

export type RetrieveCompanyWarehouseDTO = {
	company: string;
};

export type RetrieveStockQuantitiesDTO = {
	warehouse: string;
};

export interface RetrieveWarehouseListDTO extends PaginationDTO, SortDTO {
	fields: string[];
}

export interface RetrieveCustomerWarehouseDTO extends PaginationDTO, SortDTO {
	customer: string;
	fields?: string[];
}
