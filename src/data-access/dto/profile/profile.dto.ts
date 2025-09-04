import type { PaginationDTO, SortDTO } from "../common/pagination.dto";


// [ ] Move to a distant location.
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

export interface ReadProfilesDTO extends PaginationDTO, SortDTO {
	email?: string;
}
