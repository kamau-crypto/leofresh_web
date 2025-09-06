import type { AxiosInstance, AxiosResponse } from "axios";
import type { RetrieveSuppliersDTO } from "../dto";
import type { AllSuppliersModel } from "../models";
import { FrappeInstance } from "./frappe";

export class SupplierDataSource extends FrappeInstance {
	private supplierInstance: AxiosInstance;
	private docType: string;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.supplierInstance = this.getFrappeClient();
	}

	async getAllSuppliers({
		fields,
		limit_page_length,
		order_by,
	}: RetrieveSuppliersDTO) {
		const response: AxiosResponse<{ data: AllSuppliersModel[] }> =
			await this.supplierInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(fields),
					// filters: JSON.stringify([
					// 	["supplier_group", "=", "Leofresh Supplier"],
					// ]), // Only show the suppliers who are in a company
					limit_page_length,
					order_by,
				},
			});
		return response.data.data;
	}
}
