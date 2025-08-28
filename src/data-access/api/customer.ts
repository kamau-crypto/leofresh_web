import type { AxiosInstance } from "axios";
import type {
	CreateCustomerDTO,
	DisableCustomerDTO,
	UpdateCustomerDTO,
} from "../dto";
import { FrappeInstance } from "./frappe";

export class Customer extends FrappeInstance {
	private customerInstance: AxiosInstance;
	private docType: string;

	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.customerInstance = this.getFrappeClient();
	}

	createCustomer(data: CreateCustomerDTO) {
		return this.customerInstance.post(`/${this.docType}`, data);
	}

	updateCustomer(data: UpdateCustomerDTO) {
		return this.customerInstance.put(`/${this.docType}/${data.name}`, data);
	}

	deleteCustomer({ name }: DisableCustomerDTO) {
		return this.customerInstance.delete(`/${name}`);
	}
}
