import type { AxiosInstance, AxiosResponse } from "axios";
import type {
	CreateWorkOrderDTO,
	GetWorkOrderDTO,
	UpdateWorkOrderDTO,
} from "../dto";
import type {
	CreatedWorkOrderModel,
	ListWorkOrderModel,
	UpdatedWorkOrderModel,
} from "../models";
import { FrappeInstance } from "./frappe";

export class WorkOrderDataSource extends FrappeInstance {
	private workOrderInstance: AxiosInstance;
	private docType: string;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.workOrderInstance = this.getFrappeClient();
	}

	async getAllWorkOrders({
		fields,
		limit_page_length,
		limit_start,
		order_by,
		filters,
	}: GetWorkOrderDTO): Promise<ListWorkOrderModel[]> {
		const res: AxiosResponse<{ data: ListWorkOrderModel[] }> =
			await this.workOrderInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(fields),
					filters: JSON.stringify(filters ?? []),
					limit_page_length,
					limit_start,
					order_by,
				},
			});
		return res.data.data;
	}

	async getWorkOrderDetails(name: string): Promise<any> {
		const res: AxiosResponse<{ data: any }> = await this.workOrderInstance.get(
			`${this.docType}/${name}`
		);
		return res.data.data;
	}
	// [ ] Map Submitted WorkOrder to Domain Entity
	async submitWorkOrder(name: string): Promise<void> {
		const doc = await this.getWorkOrderDetails(name);
		await this.frappeSubmit({ doc });
	}

	async createWorkOrder(
		data: CreateWorkOrderDTO
	): Promise<CreatedWorkOrderModel> {
		const res: AxiosResponse<{ data: CreatedWorkOrderModel }> =
			await this.workOrderInstance.post(this.docType, data);
		return res.data.data;
	}

	// [ ] Transfer of materials to WIP warehouse
	// [ ] transfer of finished goods to FG warehouse

	async updateWorkOrder(
		data: UpdateWorkOrderDTO
	): Promise<UpdatedWorkOrderModel> {
		const res: AxiosResponse<{ data: UpdatedWorkOrderModel }> =
			await this.workOrderInstance.put(this.docType, data);
		return res.data.data;
	}
}
