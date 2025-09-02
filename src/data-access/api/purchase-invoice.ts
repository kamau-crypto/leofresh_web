import type { AxiosInstance, AxiosResponse } from "axios";
import type {
	CreatedPurchaseInvoiceDataDTO,
	CreatePurchaseInvoicesDTO,
	GetPurchaseInvoiceDTO,
} from "../dto";
import type {
	CreatedPurchaseInvoiceModel,
	ReadCreatedPurchaseInvoiceModel,
} from "../models";
import { FrappeInstance } from "./frappe";

export class PurchaseInvoice extends FrappeInstance {
	private docType: string;
	private purchaseInvoiceInstance: AxiosInstance;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.purchaseInvoiceInstance = this.getFrappeClient();
	}

	async createPurchaseInvoice({ data }: { data: CreatePurchaseInvoicesDTO }) {
		const res: AxiosResponse<CreatedPurchaseInvoiceModel> =
			await this.purchaseInvoiceInstance.post(this.docType, data);
		return res.data.data;
	}
	async getPurchcaseInvoiceData({ purchase_invoice }: GetPurchaseInvoiceDTO) {
		return await this.frappeConstructInvoiceData({ purchase_invoice });
	}

	async submitPurchaseInvoice({
		purchaseInv,
	}: {
		purchaseInv: CreatedPurchaseInvoiceDataDTO;
	}) {
		const res: AxiosResponse<{ message: ReadCreatedPurchaseInvoiceModel }> =
			await this.frappeSubmit({ doc: purchaseInv });
		return res.data.message;
	}

	//Create the purchase invoice from a purchase order. this only occurs when the purchase order is successfully submitted,
	async purchasesInvoiceCycle({ purchase_invoice }: GetPurchaseInvoiceDTO) {
		const poI = await this.getPurchcaseInvoiceData({ purchase_invoice });
		const createPI = await this.createPurchaseInvoice({ data: poI });
		const submitPI = await this.submitPurchaseInvoice({
			purchaseInv: createPI,
		});
		return submitPI;
	}
}
