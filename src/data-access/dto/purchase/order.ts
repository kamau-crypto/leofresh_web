import type { PaginationDTO, SortDTO } from "../common/pagination.dto";

export interface CreatePurchaseOrdersDTO {}

export interface RetrievePurchaseOrdersDTO extends PaginationDTO, SortDTO {
	cost_center: string;
	fields: string[];
}

export interface RetrievePurchaseOrderDTO {
	name: string;
}

export type SubmitPurchaseOrderDTO = RetrievePurchaseOrderDTO;
export type CancelPurchaseOrderDTO = RetrievePurchaseOrderDTO;
export type DeletePurchaseOrderDTO = RetrievePurchaseOrderDTO;
export type ResendPurchaseOrderDTO = RetrievePurchaseOrderDTO;

export type UpdatePurchaseOrderDTO = {
	name: string;
	data: { status: string; per_received: number };
};
