import type { CommonEntity } from "../common/common.entities";

export interface ListWorkOrderFilterEntity extends CommonEntity {}

export interface ListWorkOrderEntity {
	item_name: string;
	name: string;
	item: string;
	status: string;
	qty: number;
	produced_qty: number;
	fg_warehouse: string;
	modified: string;
}

export interface TabulateWorkOrderEntity extends ListWorkOrderEntity {
	id: string;
}

export interface WorkOrderDetailsEntity {}

export interface WorkOrderContentsEntity {}

export interface CreateWorkOrderEntity {
	data: string[];
}

export interface UpdateWorkOrderEntity {}

export interface CancelWorkOrderEntity {}
