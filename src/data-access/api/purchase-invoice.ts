import {
	CreatedPurchaseInvoice,
	CreatedPurchaseInvoiceData,
	CreatePurchaseInvoices,
	ReadCreatedPurchaseInvoice,
} from "@/constants";
import { AxiosInstance, AxiosResponse } from "axios";
import { FrappeInstance } from "./frappe";

export class PurchaseInvoice extends FrappeInstance {
	private docType: string;
	private purchaseInvoiceInstance: AxiosInstance;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.purchaseInvoiceInstance = this.getFrappeClient();
	}

	async createPurchaseInvoice({ data }: { data: CreatePurchaseInvoices }) {
		const res: AxiosResponse<CreatedPurchaseInvoice> =
			await this.purchaseInvoiceInstance.post(this.docType, data);
		return res.data.data;
	}

	async getPurchcaseInvoiceData({ purchaseOrder }: { purchaseOrder: string }) {
		return await this.frappeConstructInvoiceData({ purchaseOrder });
	}

	async submitPurchaseInvoice({
		purchaseInv,
	}: {
		purchaseInv: CreatedPurchaseInvoiceData;
	}) {
		const res: AxiosResponse<{ message: ReadCreatedPurchaseInvoice }> =
			await this.frappeSubmit({ doc: purchaseInv });
		return res.data.message;
	}

	//Create the purchase invoice from a purchase order. this only occurs when the purchase order is successfully submitted,
	async purchasesInvoiceCycle({ purchaseOrder }: { purchaseOrder: string }) {
		const poI = await this.getPurchcaseInvoiceData({ purchaseOrder });
		const createPI = await this.createPurchaseInvoice({ data: poI });
		const submitPI = await this.submitPurchaseInvoice({
			purchaseInv: createPI,
		});
		return submitPI;
	}
}
