export interface SalesInvoiceRepository {
	createInvoice(data: any): Promise<any>;
	submitInvoice(id: string): Promise<any>;
	getInvoice(id: string): Promise<any>;
}
