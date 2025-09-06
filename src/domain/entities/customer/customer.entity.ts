export interface CustomerFilterEntity {
	limit_page_length: number;
	limit_start: number;
	order_by: string;
}

export interface CustomerEntity {
	name: string;
	customer_type: string;
	customer_group: string;
	territory: string;
}

export type ListCustomerEntity = CustomerEntity & {
	id: string;
};
