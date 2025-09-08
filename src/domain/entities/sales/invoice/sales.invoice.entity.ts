import type { CommonEntity } from "../../common/common.entities";

export interface SalesInvoiceListEntity {
	id: string;
	company: string;
	name: string;
	customer: string;
	status: string;
	grand_total: number;
	due_date: string;
	posting_date: string;
	cost_center: string;
	mpesa_amount: number;
	cash_amount: number;
}

export type SalesInvoiceFilterEntity = CommonEntity & {
	cost_center: string;
};
