import {
	CreatedJournalEntryRecord,
	CreateJournalEntry,
	ReadCreatedJournalEntry,
} from "@/constants";
import type { AxiosInstance, AxiosResponse } from "axios";
import { FrappeInstance } from "./frappe";

export class JournalEntry extends FrappeInstance {
	private docType: string;
	private journalEntryInstance: AxiosInstance;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.journalEntryInstance = this.getFrappeClient();
	}
	// Intended for use when posting an expense and when banking.

	async createJournalEntry({ data }: { data: CreateJournalEntry }) {
		const res: AxiosResponse<{ data: CreatedJournalEntryRecord }> =
			await this.journalEntryInstance.post(this.docType, {
				data,
			});
		return res.data.data;
	}

	async createAndSubmitJournalEntry({ data }: { data: CreateJournalEntry }) {
		const doc = await this.createJournalEntry({ data });
		const res: AxiosResponse<{ message: ReadCreatedJournalEntry }> =
			await this.frappeSubmit({ doc });
		return res.data.message;
	}
}
