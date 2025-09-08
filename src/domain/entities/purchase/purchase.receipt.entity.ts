import type { CommonEntity } from "../common/common.entities";

export interface PurchaseReceiptsListEntity {
	name: string;
	modified: string;
	creation: string;
	owner: string;
	docstatus: number;
	cost_center: string;
	supplier: string;
	grand_total: number;
	status: string;
}

export type PurchaseReceiptsFilterEntity = CommonEntity & {
	cost_center: string;
};
