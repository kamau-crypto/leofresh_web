import type { PurchaseReceiptsFilterEntity } from "@/domain/entities/purchase/purchase.receipt.entity";
import { LeofreshError } from "@/lib/error";
import { extractFrappeErrorMessage } from "@/lib/frappe_error_handler";
import type { PurchaseReceiptRepository } from "@/repository/purchase.receipt.repository";

export class PurchaseReceiptUseCase {
	private pRRepository: PurchaseReceiptRepository;

	constructor({ pRRepository }: { pRRepository: PurchaseReceiptRepository }) {
		this.pRRepository = pRRepository;
	}

	//Get a list of all purchase receipts
	allPurchaseReceipts(filter: Omit<PurchaseReceiptsFilterEntity, "fields">) {
		try {
			return this.pRRepository.getAllPurchaseReceipts({ filter });
		} catch (error) {
			throw new LeofreshError({
				message: extractFrappeErrorMessage({ error }),
			});
		}
	}
	//Create Purchase Receipt
	makePurchaseReceipt() {
		throw new LeofreshError({ message: "Not Implemented" });
	}

	//
	//Read Purchase Receipt
	PurchaseReceiptDetails({}: { name: string }) {
		throw new LeofreshError({ message: "Not Implemented" });
	}
}
