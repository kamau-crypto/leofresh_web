import { SalesInvoiceDataSource } from "@/data-access/api/sales-invoice";
import type {
	SalesInvoiceFilterEntity,
	SalesInvoiceListEntity,
} from "@/domain";

interface ISalesInvoiceRepository {
	createInvoice(data: any): Promise<any>;
	submitInvoice(id: string): Promise<any>;
	getInvoice(id: string): Promise<any>;
	listInvoices: ({
		params,
	}: {
		params: Omit<SalesInvoiceFilterEntity, "fields">;
	}) => Promise<SalesInvoiceListEntity[]>;
}

export class SalesInvoiceRepository implements ISalesInvoiceRepository {
	constructor() {}

	async listInvoices({
		params,
	}: {
		params: Omit<SalesInvoiceFilterEntity, "fields">;
	}): Promise<SalesInvoiceListEntity[]> {
		const fields = [
			"name",
			"customer",
			"mpesa_amount",
			"cash_amount",
			"status",
			"grand_total",
			"posting_date",
			"creation",
			"modified",
		];
		const salesInv = new SalesInvoiceDataSource({ docType: "Sales Invoice" });
		const invoices = await salesInv.retrieveSalesInvoices({
			...params,
			fields,
		});
		return this.mapToDomain({ invoices });
	}

	async createInvoice(data: any): Promise<any> {
		const salesInv = new SalesInvoiceDataSource({ docType: "Sales Invoice" });
		const invoice = await salesInv.createSalesInvoice({ inv: data });
		return invoice;
	}
	async getInvoice(id: string): Promise<any> {
		const salesInv = new SalesInvoiceDataSource({ docType: "Sales Invoice" });
		const invoice = await salesInv.retrieveSalesInvoice({ name: id });
		return invoice;
	}
	async submitInvoice(id: string): Promise<any> {
		const salesInv = new SalesInvoiceDataSource({ docType: "Sales Invoice" });
		const invoice = await salesInv.submitSalesInvoice({ order: { name: id } });
		return invoice;
	}

	mapToDomain({
		invoices,
	}: {
		invoices: Omit<SalesInvoiceListEntity, "id">[];
	}) {
		return invoices.map(inv => ({
			id: inv.name,
			...inv,
		}));
	}
}
