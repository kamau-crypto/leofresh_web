import type { AxiosInstance, AxiosResponse } from "axios";
import type { GetTankDetailsDTO, GetTanksDTO } from "../dto";
import type {
	ReadCustomerTankModel,
	ReadTankDetailsModel,
} from "../models/tank.model";
import { FrappeInstance } from "./frappe";

export class Tanks extends FrappeInstance {
	private docType: string;
	private tankInstance: AxiosInstance;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.tankInstance = this.getFrappeClient();
	}
	//You can get the tank details per specific customer.
	async getTanksWithCustomer({
		customer_name,
		fields,
		limit_page_length,
		limit_start,
		order_by,
	}: GetTanksDTO) {
		const filters = customer_name
			? JSON.stringify([
					["tank", "=", `${customer_name}`],
					["tank", "!=", ""],
				])
			: JSON.stringify([["tank", "!=", ""]]);
		const tank: AxiosResponse<{ data: ReadCustomerTankModel[] }> =
			await this.tankInstance.get("Customer", {
				params: {
					fields: JSON.stringify(fields),
					filters,
					limit_page_length,
					limit_start,
					order_by,
				},
			});
		return tank.data.data;
	}
	//available within a shop
	async getTankDetails({ tank_name, fields }: GetTankDetailsDTO) {
		const tank: AxiosResponse<{ data: ReadTankDetailsModel }> =
			await this.tankInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(fields),
					filters: JSON.stringify([["name", "=", `${tank_name}`]]),
				},
			});
		return tank.data.data;
	}

	async createTank(data: any): Promise<string> {
		const tank: AxiosResponse<{ name: string }> = await this.tankInstance.post(
			this.docType,
			{ data }
		);
		return tank.data.name;
	}
	//
	//We might not need this.
	// async getTankReadingType({ tank }: GetTankReadingTypeDTO) {
	// 	const res: AxiosResponse<{ data: ReadTankReadingModel }> =
	// 		await this.tankInstance.get(this.docType, {
	// 			params: {
	// 				fields: JSON.stringify(["reading_type"]),
	// 			},
	// 		});
	// 	return res.data.data;
	// }
}
