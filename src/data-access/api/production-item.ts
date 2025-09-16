import type { AxiosResponse } from "axios";
import type { ProductionItemDTO } from "../dto";
import type { ProductionItemListModel } from "../models";
import { FrappeInstance } from "./frappe";

export class ProductionItemDataSource extends FrappeInstance {
	private doctype: string;
	constructor({ doctype }: { doctype: string }) {
		super();
		this.doctype = doctype;
	}

	async listAllProductionItems({
		fields,
	}: ProductionItemDTO): Promise<ProductionItemListModel[]> {
		const prodItems: AxiosResponse<{ data: ProductionItemListModel[] }> =
			await this.getFrappeClient().get(this.doctype, {
				params: {
					fields: JSON.stringify(fields),
				},
			});
		return prodItems.data.data;
	}
}
