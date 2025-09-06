import type { CommonEntity } from "../common/common.entities";

export interface PurchaseInvoiceEntity {
	id: string;
	supplier: string;
	name: string;
	title: string;
	supplier_name: string;
	company: string;
	posting_date: string;
	posting_time: string;
	modified: string;
	cost_center: string;
	due_date: string;
	is_paid: boolean;
	total: number;
	status: PurchaseInvoiceEntityStatus;
	grand_total: number;
}

export interface PurchaseInvoiceFilterEntityFilter extends CommonEntity {
	cost_center: string;
}

type PurchaseInvoiceEntityStatus =
	| "Draft"
	| "Return"
	| "Debit Note Issued"
	| "Submitted"
	| "Paid"
	| "Partly Paid"
	| "Unpaid"
	| "Overdue"
	| "Cancelled"
	| "Internal Transfer";
