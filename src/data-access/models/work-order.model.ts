export interface ListWorkOrderModel {
	item_name: string;
	name: string;
	item: string;
	status: string;
	qty: number;
	produced_qty: number;
	fg_warehouse: string;
	modified: string;
}

export interface CreatedWorkOrderModel {
	name: string;
	process_loss_qty: number;
	produced_qty: number;
}

export interface UpdatedWorkOrderModel extends CreatedWorkOrderModel {}
// export interface
