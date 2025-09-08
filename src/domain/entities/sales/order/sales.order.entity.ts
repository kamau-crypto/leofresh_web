import type { CommonEntity } from "../../common/common.entities";

export type SalesOrderFilterEntity = CommonEntity & {
	cost_center: string;
};

export interface SalesOrderListEntity {
	id: string;
	customer: string;
	name: string;
	status: string;
	posting_date: string;
	grand_total: string;
	company: string;
	modified: string;
	creation: string;
}
