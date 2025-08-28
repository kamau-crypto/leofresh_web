export interface ReadBankAccountsModel {
	data: ReadBankAccountModel[];
}

export interface ReadBankAccountModel {
	account: string;
	account_name: string;
	bank: string;
	account_type: null;
	account_subtype: null;
}
