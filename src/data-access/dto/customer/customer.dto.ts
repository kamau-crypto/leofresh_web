import type { PaginationDTO, SortDTO } from "../common/common.dto";

export type CustomerType = "Company" | "Individual" | "Partnership";

export interface CreateCustomerDTO {
	customer_name: string;
	customer_type: CustomerType;
	customer_group?: string;
	territory?: string;
	gender?: string;
}

export interface UpdateCustomerDTO extends Partial<CreateCustomerDTO> {
	name: string;
}

export interface DisableCustomerDTO extends Pick<UpdateCustomerDTO, "name"> {}
// [ ] Add a customer Location
// [ ] Add a customer phone number

export interface GetCustomerDTO extends PaginationDTO, SortDTO {
	fields: string[];
}
