import type { CommonEntity } from "../common/common.entities";

export interface PurchaseOrderListEntity {
	name: string;
	company: string;
	supplier: string;
	transaction_date: string;
	schedule_date: Date;
	status: string;
	project: null;
	buying_price_list: string;
	total: number;
	grand_total: number;
	advance_paid: number;
	cost_center: null | string;
	currency: string;
	per_received: number;
	creation: string;
}

export type PurchaseOrderFilterEntity = CommonEntity & {
	cost_center: string;
};
