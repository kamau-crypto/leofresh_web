import { PurchaseInvoice } from "@/data-access/api/purchase-invoice";
import type { PurchaseInvoiceModel } from "@/data-access/models";
import type {
	PurchaseInvoiceEntity,
	PurchaseInvoiceFilterEntityFilter,
} from "@/domain";

export interface IPurchaseInvoiceRepository {
	getAllPurchaseInvoices: ({
		params,
	}: {
		params: Omit<PurchaseInvoiceFilterEntityFilter, "fields">;
	}) => Promise<PurchaseInvoiceEntity[]>;
}

export class PurchaseInvoiceRepository implements IPurchaseInvoiceRepository {
	constructor() {}

	getAllPurchaseInvoices: ({
		params,
	}: {
		params: Omit<PurchaseInvoiceFilterEntityFilter, "fields">;
	}) => Promise<PurchaseInvoiceEntity[]> = async ({ params }) => {
		const fields = [
			"name",
			"title",
			"supplier",
			"supplier_name",
			"modified",
			"company",
			"cost_center",
			"grand_total",
			"posting_time",
			"status",
			"due_date",
			"posting_date",
		];

		const dataSource = new PurchaseInvoice({ docType: "Purchase Invoice" });
		const purchaseInvoices = await dataSource.getPurchaseInvoices({
			params: { ...params, fields },
		});
		return this.mapPurchaseInvoicesToDomain(purchaseInvoices);
	};

	private mapPurchaseInvoicesToDomain(
		invoices: PurchaseInvoiceModel[]
	): PurchaseInvoiceEntity[] {
		return invoices.map((invoice, _id) => ({
			id: invoice.name,
			supplier: invoice.supplier,
			title: invoice.title,
			modified: invoice.modified,
			company: invoice.company ?? "Leofresh Limited",
			naming_series: invoice.naming_series,
			supplier_name: invoice.supplier_name ?? invoice.supplier,
			cost_center: invoice.cost_center ?? "Main - LBL",
			total: invoice.grand_total ?? 0,
			posting_time: invoice.posting_time ?? "00:00:00",
			is_paid: invoice.status === "Paid" || invoice.status === "Partly Paid",
			due_date: invoice.due_date ?? invoice.posting_date,
			grand_total: invoice.grand_total ?? 0,
			name: invoice.name,
			status: invoice.status ?? "Draft",
			posting_date: invoice.posting_date,
		}));
	}
}
