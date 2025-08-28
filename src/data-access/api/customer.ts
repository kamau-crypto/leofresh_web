import { FrappeInstance } from "./frappe";
import type { AxiosInstance } from "axios";

export class Customer extends FrappeInstance{
    private customerInstance: AxiosInstance;
    private docType: string;

    constructor({docType}: {docType: string}) {
        super();
        this.docType = docType;
        this.customerInstance = this.getFrappeClient();
    }

    createCustomer(data: CreateCustomerDto) {
        return this.customerInstance.post(`/${this.docType}`, data);
    }

    updateCustomer(data: UpdateCustomerDto) {
        return this.customerInstance.put(`/${this.docType}/${data.id}`, data);
    }s

    deleteCustomer(customerId: string) {
        return this.customerInstance.delete(`/${customerId}`);
    }
}