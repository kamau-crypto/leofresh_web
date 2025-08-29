export interface ReadExpenseAccountsModel {
	name: string;
}

export interface RetrievedJournalEntryModel {
	data: RetrievedJournalEntryDataModel[];
}

export interface RetrievedJournalEntryDataModel {
	name: string;
	total_debit: number;
	posting_date: string;
	account: string;
	remark: string;
	cost_center: string;
}
