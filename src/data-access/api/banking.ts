//DocType to affect is Payment Entry. TO make a successfull banking, retrive the last

import type { AxiosInstance, AxiosResponse } from "axios";
import { bankAccountFieldsDTO, type CreatePaymentEntryDTO } from "../dto";
import type {
	ReadPaymentEntryDataModel,
	ReadSubmittedPaymentEntryModel,
} from "../models";
import type { ReadBankAccountsModel } from "../models/banking.model";
import { FrappeInstance } from "./frappe";

//purchase Invoice that was was not paid alongside all its corresponding details..
export class Banking extends FrappeInstance {
	private bankingInstance: AxiosInstance;
	private docType: string;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.bankingInstance = this.getFrappeClient();
	}

	//
	//To make a payment, create, and submit a payment Entry. //Alternatively

	async createPaymentEntry({ data }: { data: CreatePaymentEntryDTO }) {
		// const createdPayment: AxiosResponse<{ data: CreatedPaymentEntryDoc }> =
		const createdPayment = await this.bankingInstance.post(this.docType, {
			data,
		});
		return createdPayment.data.data;
	}

	async makePaymentEntry({ data }: { data: CreatePaymentEntryDTO }) {
		const payment = await this.createPaymentEntry({ data });
		const retrPayment = await this.retrievePaymentEntry({
			name: payment.name,
		});
		const createdPayment: AxiosResponse<ReadSubmittedPaymentEntryModel> =
			await this.frappeSubmit({ doc: retrPayment });

		return createdPayment.data.message;
	}

	async retrievePaymentEntry({ name }: { name: string }) {
		const res: AxiosResponse<{ data: ReadPaymentEntryDataModel }> =
			await this.bankingInstance.get(`${this.docType}/${name}`);
		return res.data.data;
	}

	async retrieveCompanyBankAccounts({ company }: { company: string }) {
		const bankAccounts: AxiosResponse<ReadBankAccountsModel> =
			await this.bankingInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(bankAccountFieldsDTO),
					filters: JSON.stringify([["company", "=", `${company}`]]),
				},
			});
		return bankAccounts.data.data;
	}
}
