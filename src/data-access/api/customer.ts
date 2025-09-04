import type { AxiosInstance, AxiosResponse } from "axios";
import {
	type CreateCustomerDTO,
	type DisableCustomerDTO,
	type GetCustomerDTO,
	type UpdateCustomerDTO,
} from "../dto";
import type { CustomerModel } from "../models";
import { FrappeInstance } from "./frappe";

export class CustomerDataSource extends FrappeInstance {
	private customerInstance: AxiosInstance;
	private docType: string;

	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.customerInstance = this.getFrappeClient();
	}
	async getAllCustomers({
		fields,
		limit_page_length,
		limit_start,
		order_by,
	}: GetCustomerDTO): Promise<AxiosResponse<{ data: CustomerModel[] }>> {
		return await this.customerInstance.get(`/${this.docType}`, {
			params: {
				fields: JSON.stringify(fields),
				limit_page_length,
				limit_start,
				order_by,
			},
		});
	}

	async createCustomer(data: CreateCustomerDTO) {
		return await this.customerInstance.post(`/${this.docType}`, data);
	}

	async updateCustomer(data: UpdateCustomerDTO) {
		return await this.customerInstance.put(
			`/${this.docType}/${data.name}`,
			data
		);
	}

	async deleteCustomer({ name }: DisableCustomerDTO) {
		return await this.customerInstance.delete(`/${name}`);
	}
}
