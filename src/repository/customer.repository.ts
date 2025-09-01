import { CustomerDataSource, type GetCustomerDTO } from "@/data-access";
import type { CustomerModel } from "@/data-access/models";
import type { CustomerFilterEntity, ListCustomerEntity } from "@/domain";

export interface ICustomerRepository {
	getAllCustomers({
		docType,
		params,
	}: {
		params: CustomerFilterEntity;
		docType: string;
	}): Promise<ListCustomerEntity[]>;
}

export class CustomerRepository implements ICustomerRepository {
	private customerDataSource: CustomerDataSource;

	constructor() {
		this.customerDataSource = new CustomerDataSource({ docType: "Customer" });
	}

	async getAllCustomers({
		params,
	}: {
		params: CustomerFilterEntity;
	}): Promise<ListCustomerEntity[]> {
		// transform Domain Filter to DTO
		const customerFields = [
			"name",
			"customer_name",
			"customer_type",
			"customer_group",
			"territory",
			"creation",
		];

		const queryDTO: GetCustomerDTO = {
			limit_page_length: params.limit_page_length,
			fields: customerFields,
			limit_start: params.limit_start,
			order_by: params.order_by,
		};

		const response = await this.customerDataSource.getAllCustomers({
			...queryDTO,
		});
		return this.mapToDomain({ customers: response.data.data });
	}

	mapToDomain({
		customers,
	}: {
		customers: CustomerModel[];
	}): ListCustomerEntity[] {
		return customers.map(customer => ({
			id: customer.name,
			name: customer.name,
			customer_type: customer.customer_type,
			customer_group: customer.customer_group,
			territory: customer.territory,
		}));
	}
}
