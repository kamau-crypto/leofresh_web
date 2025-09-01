import type { AxiosInstance, AxiosResponse } from "axios";
import type { GetItemsDTO } from "../dto";
import type { PurchaseItemModel } from "../models";
import { FrappeInstance } from "./frappe";

export class ItemsForSaleDataSource extends FrappeInstance {
	private docType: string;
	private purchaseItemInstance: AxiosInstance;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.purchaseItemInstance = this.getFrappeClient();
	}

	async getFinishedProductsToSellOrBuy({ fields }: { fields: GetItemsDTO }) {
		const items: AxiosResponse<{ data: PurchaseItemModel[] }> =
			await this.purchaseItemInstance(this.docType, {
				params: {
					fields: JSON.stringify(fields),
					filters: JSON.stringify([["item_group", "=", "Products"]]),
				},
			});
		return items.data.data;
	}
	async retrieveNamingSeries() {
		const naming_series: AxiosResponse<{ data: { naming_series: string } }> =
			await this.purchaseItemInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(["naming_series"]),
					limit: 1,
				},
			});
		return naming_series.data.data;
	}
}

export const ItemGroup = {
	Products: "Products",
	RawMaterial: "Raw Material",
	SubAssemblies: "Sub Assemblies",
} as const;

export const StockUom = {
	DecigramLitre: "Decigram/Litre",
	Litre: "Litre",
	NOS: "Nos",
} as const;
