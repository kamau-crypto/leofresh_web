import type { AxiosInstance } from "axios";
import { FrappeInstance } from "./frappe";

export class WorkOrderDataSource extends FrappeInstance {
	private workOrderInstance: AxiosInstance;
	private docType: string;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.workOrderInstance = this.getFrappeClient();
	}

	async getAllWorkOrders() {}

	async createWorkOrder() {}

	async updateWorkOrder() {}
}
