import type {
	SalesInvoiceFilterEntity,
	SalesInvoiceListEntity,
} from "@/domain";
import { LeofreshError } from "@/lib/error";
import { extractFrappeErrorMessage } from "@/lib/frappe_error_handler";
import type { SalesInvoiceRepository } from "@/repository/sales.invoice.repository";

export class SalesInvoiceUseCase {
	private salesInvoiceRepository: SalesInvoiceRepository;

	constructor(salesInvoiceRepository: SalesInvoiceRepository) {
		this.salesInvoiceRepository = salesInvoiceRepository;
	}

	async listInvoices({
		params,
	}: {
		params: Omit<SalesInvoiceFilterEntity, "fields">;
	}): Promise<SalesInvoiceListEntity[]> {
		try {
			return this.salesInvoiceRepository.listInvoices({ params });
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}

	async createInvoice(data: any): Promise<any> {
		try {
			return await this.salesInvoiceRepository.createInvoice(data);
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}

	async getInvoice(id: string): Promise<any> {
		try {
			return await this.salesInvoiceRepository.getInvoice(id);
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}

	async submitInvoice(id: string): Promise<any> {
		try {
			return await this.salesInvoiceRepository.submitInvoice(id);
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}
}
