export interface ReadProfileDTO {
	customer: string;
	company: string;
	warehouse_name: string;
	source_warehouse: string;
	cost_center: string;
	currency: string;
	selling_price_list: string;
	user_email: string;
	project: string;
	lnmo: string | null;
	bank_no: string | null;
	bank_account: string;
	expense_account: string;
	income_account: string;
	debtor_account: string;
	unrealized_profit: string;
	waste_water: number;
	write_off_account: string;
}

export const profileFieldsDTO: string[] = [
	"customer",
	"company",
	"source_warehouse",
	"warehouse.name as warehouse_name",
	"cost_center",
	"currency",
	"selling_price_list",
	"applicable_for_users.user as user_email",
	"project",
	"lnmo",
	"write_off_account",
	"bank_account",
	"expense_account",
	"income_account",
	"debtor_account",
	"unrealized_profit",
	"waste_water",
];
