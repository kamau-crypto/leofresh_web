import type { CommonEntity } from "../common/common.entities";

export type SupplierEntity = {
	supplier_name: string;
	supplier_type: string;
	mobile_no: string;
	supplier_group: string;
	modified: string;
};

export type SupplierFilterEntity = CommonEntity & {};
