import type { AxiosInstance, AxiosResponse } from "axios";
import type {
	RetrieveCompanyWarehouseDTO,
	RetrieveCustomerWarehouseDTO,
	RetrieveStockQuantitiesDTO,
	RetrieveWarehouseListDTO,
} from "../dto";
import type {
	ReadWarehousesListModel,
	ReadWarehouseStockLevelModel,
} from "../models";
import { FrappeInstance } from "./frappe";

export class Warehouse extends FrappeInstance {
	private warehouseInstance: AxiosInstance;
	private DocType: string;
	constructor({ docType }: { docType: string }) {
		super();
		this.DocType = docType;
		this.warehouseInstance = this.getFrappeClient();
	}

	async retrieveCompanyWarehouses({ company }: RetrieveCompanyWarehouseDTO) {
		return await this.frappeGetWarehouses({ company });
	}

	async retrieveWarehouses({ limit_page_length }: RetrieveWarehouseListDTO) {
		const whses: AxiosResponse<{ data: ReadWarehousesListModel[] }> =
			await this.warehouseInstance.get(this.DocType, {
				params: {
					fields: JSON.stringify(["name", "is_group", "parent_warehouse"]),
					limit_page_length,
				},
			});
		return whses.data.data;
	}

	async retrieveStockQuantities({ warehouse }: RetrieveStockQuantitiesDTO) {
		const stockQuantities: AxiosResponse<{
			data: ReadWarehouseStockLevelModel[];
		}> = await this.warehouseInstance.get(this.DocType, {
			params: {
				fields: JSON.stringify([
					"item_code",
					"warehouse",
					"actual_qty",
					"stock_uom",
				]),
				filters: JSON.stringify([["warehouse", "=", `${warehouse}`]]),
			},
		});
		return stockQuantities.data.data;
	}

	async retrive_customer_warehouse({
		limit_page_length,
		customer,
		fields,
	}: RetrieveCustomerWarehouseDTO) {
		const warehouseSimilarity = customer.replace(/\w+/, "");
		const warehouses: AxiosResponse<ReadWarehousesListModel> =
			await this.warehouseInstance.get(this.DocType, {
				params: {
					fields: JSON.stringify(fields),
					limit_page_length,
					filters: JSON.stringify([
						["warehouse_name", "Like", `%${warehouseSimilarity}%`],
					]),
				},
			});
		return warehouses.data;
	}
}
