export interface CreateJournalEntryDTO {
	naming_series: string;
	voucher_type: string;
	posting_date: string;
	company: string;
	accounts: JournalAccountsDTO[];
	user_remark: string;
	multi_currency: number;
	receipt_no?: string;
}

export interface JournalAccountsDTO {
	account: string;
	cost_center?: string;
	project?: string;
	debit_in_account_currency?: number;
	credit_in_account_currency?: number;
}
