import { type CustomerFilterEntity, type ListCustomerEntity } from "@/domain";
import type { ICustomerRepository } from "../repository/";

export class CustomerUseCase {
	private customerRepository: ICustomerRepository;
	constructor({
		customerRepository,
	}: {
		customerRepository: ICustomerRepository;
	}) {
		this.customerRepository = customerRepository;
	}

	async getCustomers({
		params,
		docType = "Customer",
	}: {
		params?: CustomerFilterEntity;
		docType?: string;
	}): Promise<ListCustomerEntity[]> {
		const userParams: CustomerFilterEntity = !params
			? {
					limit_page_length: 20,
					limit_start: 0,
					order_by: "name asc",
				}
			: params;

		return this.customerRepository.getAllCustomers({
			docType,
			params: userParams,
		});
	}
}
