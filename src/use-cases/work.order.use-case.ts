import type {
	CreateWorkOrderEntity,
	ListWorkOrderFilterEntity,
	TabulateWorkOrderEntity,
} from "@/domain";
import type { WorkOrderRepository } from "@/repository/work.order.repository";

export class WorkOrderUseCase {
	private workOrderRepository: WorkOrderRepository;
	constructor(workOrderRepository: WorkOrderRepository) {
		this.workOrderRepository = workOrderRepository;
	}

	getAllWorkOrders(
		params: Omit<ListWorkOrderFilterEntity, "fields">
	): Promise<TabulateWorkOrderEntity[]> {
		return this.workOrderRepository.getAllWorkOrders(params);
	}

	createWorkOrder(data: CreateWorkOrderEntity): Promise<{ name: string }> {
		return this.workOrderRepository.createWorkOrder(data);
	}

	//
	// updateWorkOrder(data: UpdateWorkOrderDTO): Promise<{ name: string }> {
	// 	return this.workOrderRepository.updateWorkOrder(data);
	// }
}
