// Retreieve workorders
// Create workorders

import { WorkOrderDataSource } from "@/data-access/api/work-order";
import type {
	CreateWorkOrderEntity,
	ListWorkOrderEntity,
	ListWorkOrderFilterEntity,
	TabulateWorkOrderEntity,
} from "@/domain";

// Update workorders
export interface IWorkOrderRepository {
	getAllWorkOrders(
		params: Omit<ListWorkOrderFilterEntity, "fields">
	): Promise<TabulateWorkOrderEntity[]>;
	createWorkOrder(data: CreateWorkOrderEntity): Promise<{ name: string }>;
	// updateWorkOrder(data: UpdateWorkOrderDTO): Promise<{ name: string }>;
	// cancelWorkOrder(data: CancelWorkOrderDTO): Promise<{ name: string }>;
	// getWorkOrderDetails(data: GetWorkOrderDetailsDTO): Promise<WorkOrderDetailsEntity>;
}

export class WorkOrderRepository implements IWorkOrderRepository {
	private workOrderSource: WorkOrderDataSource;
	constructor() {
		this.workOrderSource = new WorkOrderDataSource({ docType: "Work Order" });
	}

	async getAllWorkOrders({
		limit_page_length,
		limit_start,
		order_by,
		filters,
	}: Omit<ListWorkOrderFilterEntity, "fields">): Promise<
		TabulateWorkOrderEntity[]
	> {
		const fields = [
			"name",
			"item_name",
			"item",
			"status",
			"qty",
			"produced_qty",
			"modified",
			"fg_warehouse",
		];

		const workOrders = await this.workOrderSource.getAllWorkOrders({
			fields,
			limit_page_length,
			limit_start,
			order_by,
			filters,
		});

		return this.maptoDomain(workOrders);
	}

	maptoDomain(data: ListWorkOrderEntity[]): TabulateWorkOrderEntity[] {
		return data.map(wo => ({ id: wo.name, ...wo }));
	}

	async createWorkOrder(
		data: CreateWorkOrderEntity
	): Promise<{ name: string }> {
		// Implementation for creating a work order
		return this.workOrderSource.createWorkOrder(data);
	}
}
