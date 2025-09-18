import type { PaginationDTO, SortDTO } from "../common/common.dto";

export interface CreateSalesInvoiceRecordDTO {
	naming_series: string;
	posting_date: string;
	weather: string;
	due_date: string;
	party_account_currency: string;
	set_posting_time: 0 | 1;
	//disable_rounded_total: 0 | 1;
	debit_to: string;
	unrealized_profit_loss_account: string;
	company: string;
	customer: string;
	project: string;
	cost_center: string;
	currency: string;
	selling_price_list: string;
	grand_total: number;
	items: CreateSalesInvItemDTO[];
	mpesa_amount: number;
	cash_amount: number;
	taxes?: SalesInvoiceRecordTaxDTO[];
}

export interface CreateSalesInvItemDTO {
	item_code: string;
	item_name: string;
	qty: number;
	rate: number;
	uom: string;
	amount: number;
	warehouse: string;
	income_account: string;
	expense_account: string;
	cost_center: string;
	project: string;
	item_tax_template: string | null;
	tax_rate: number | null;
	tax_type: string | null;
}

export type SalesInvoiceItemWiseTaxDetailsDTO = Record<string, Array<number>>;

export interface SalesInvoiceRecordTaxDTO {
	charge_type: string;
	account_head: string;
	description: "VAT";
	rate: number;
	item_wise_tax_detail: SalesInvoiceItemWiseTaxDetailsDTO;
}

export interface RetrieveSalesInvoice {
	name: string;
}
export type DeleteSalesInvoice = RetrieveSalesInvoice;
export type CancelSalesInvoice = RetrieveSalesInvoice;

export interface RetreiveSalesInvoices extends PaginationDTO, SortDTO {
	fields: string[];
	cost_center: string;
}
