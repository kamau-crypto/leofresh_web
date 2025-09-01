
import type { AxiosInstance, AxiosResponse } from "axios";
import { FrappeInstance } from "./frappe";
import type { CreateJournalEntryDTO } from "../dto";
import type { CreatedJournalEntryModel, JournalEntryRecordModel } from "../models/je.model";

export class JournalEntry extends FrappeInstance {
	private docType: string;
	private journalEntryInstance: AxiosInstance;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.journalEntryInstance = this.getFrappeClient();
	}
	// Intended for use when posting an expense and when banking.

	async createJournalEntry({ data }: { data: CreateJournalEntryDTO }) {
		const res: AxiosResponse<{ data: JournalEntryRecordModel }> =
			await this.journalEntryInstance.post(this.docType, {
				data,
			});
		return res.data.data;
	}

	async createAndSubmitJournalEntry({ data }: { data: CreateJournalEntryDTO }) {
		const doc = await this.createJournalEntry({ data });
		const res: AxiosResponse<{ message: CreatedJournalEntryModel }> =
			await this.frappeSubmit({ doc });
		return res.data.message;
	}
}
