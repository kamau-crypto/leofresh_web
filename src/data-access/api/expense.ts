import { appConfig } from "@/lib/config";
import type { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import type { FrappeCreateRequirement } from "../common/frappe.create";
import type { ReadExpenseAccountsDTO, ReadExpensesDTO } from "../dto";
import type {
	ReadExpenseAccountsModel,
	RetrievedJournalEntryModel,
} from "../models";
import { FrappeInstance } from "./frappe";

export class Expense extends FrappeInstance implements FrappeCreateRequirement {
	private docType: string;
	private expenseInstance: AxiosInstance;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.expenseInstance = this.getFrappeClient();
	}

	async retrieveNamingSeries() {
		const naming_series: AxiosResponse<{ data: { naming_series: string } }> =
			await this.expenseInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(["naming_series"]),
					limit: 1,
				},
			});
		return naming_series.data.data;
	}

	//Retrieve all the expense accounts associated with this order...
	async retrieveExpenseAccounts({ limit_page_length }: ReadExpenseAccountsDTO) {
		const accounts: AxiosResponse<{ data: ReadExpenseAccountsModel[] }> =
			await this.expenseInstance.get(this.docType, {
				params: {
					filters: JSON.stringify([
						["Account", "root_type", "=", "Expense"],
						["Account", "is_group", "=", 0],
						["Account", "name", "NOT LIKE", "%Cost of Goods Sold%"],
						["Account", "name", "NOT LIKE", "%COGS%"],
						["Account", "name", "NOT LIKE", "%Goods Sold%"],
					]),
					limit_page_length: limit_page_length,
				},
			});
		return accounts.data.data;
	}

	async retrieveExpenses({ cost_center, limit }: ReadExpensesDTO) {
		//This is a custom end point, filtering here will not work instead affect the api
		const expenses: AxiosResponse<{ message: RetrievedJournalEntryModel }> =
			await axios.post(appConfig.EXPENSES_URL, {
				cost_center: cost_center,
				limit: limit,
			});
		// return expenses.data.data.filter(f => f.cost_center === cost_center);
		return expenses.data.message.data;
	}
}
