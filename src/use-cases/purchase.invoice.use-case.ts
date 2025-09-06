import type { PurchaseInvoiceFilterEntityFilter } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { extractFrappeErrorMessage } from "@/lib/frappe_error_handler";
import type { IPurchaseInvoiceRepository } from "@/repository/purchase.invoice.repository";

export class PurchaseInvoiceUseCase {
	private purchaseInvoiceRepository: IPurchaseInvoiceRepository;

	constructor(purchaseInvoiceRepository: IPurchaseInvoiceRepository) {
		this.purchaseInvoiceRepository = purchaseInvoiceRepository;
	}

	//Get a list of all purchase invoices
	getAllPurchaseInvoices({
		cost_center,
		limit_page_length,
		limit_start,
		order_by,
	}: Omit<PurchaseInvoiceFilterEntityFilter, "fields">) {
		try {
			return this.purchaseInvoiceRepository.getAllPurchaseInvoices({
				params: {
					cost_center,
					limit_page_length,
					limit_start,
					order_by,
				},
			});
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}
}
