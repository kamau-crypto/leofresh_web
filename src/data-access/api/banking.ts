//DocType to affect is Payment Entry. TO make a successfull banking, retrive the last

import {
	bankAccountFields,
	CreatePaymentEntry,
	ReadBankAccounts,
	ReadPaymentEntryData,
	ReadSubmittedPaymentEntry,
} from "@/constants";
import type { AxiosInstance, AxiosResponse } from "axios";
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

	async createPaymentEntry({ data }: { data: CreatePaymentEntry }) {
		// const createdPayment: AxiosResponse<{ data: CreatedPaymentEntryDoc }> =
		const createdPayment = await this.bankingInstance.post(this.docType, {
			data,
		});
		return createdPayment.data.data;
	}

	async makePaymentEntry({ data }: { data: CreatePaymentEntry }) {
		const payment = await this.createPaymentEntry({ data });
		const retrPayment = await this.retrievePaymentEntry({
			name: payment.name,
		});
		const createdPayment: AxiosResponse<ReadSubmittedPaymentEntry> =
			await this.frappeSubmit({ doc: retrPayment });

		return createdPayment.data.message;
	}

	async retrievePaymentEntry({ name }: { name: string }) {
		const res: AxiosResponse<{ data: ReadPaymentEntryData }> =
			await this.bankingInstance.get(`${this.docType}/${name}`);
		return res.data.data;
	}

	async retrieveCompanyBankAccounts({ company }: { company: string }) {
		const bankAccounts: AxiosResponse<ReadBankAccounts> =
			await this.bankingInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(bankAccountFields),
					filters: JSON.stringify([["company", "=", `${company}`]]),
				},
			});
		return bankAccounts.data.data;
	}
}
