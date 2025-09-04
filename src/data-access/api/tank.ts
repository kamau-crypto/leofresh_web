import type { AxiosInstance, AxiosResponse } from "axios";
import type {
	CreateTankReadingDTO,
	GetLatestTankReadingDTO,
	GetTankDetailsDTO,
	GetTankDTO,
	GetTankReadingTypeDTO,
} from "../dto";
import type {
	CreatedTankReadingModel,
	ReadCustomerTankModel,
	ReadTankDetailsModel,
	ReadTankReadingModel,
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
	//
	//Get Water Tanks
	async getTanks() {}
	//Retrieve the water tanks needed within the app, they can be more than one water tank
	//available within a shop
	async getTank({ tank_name, fields }: GetTankDTO) {
		const tank: AxiosResponse<{ data: ReadCustomerTankModel[] }> =
			await this.tankInstance.get("Customer", {
				params: {
					fields: JSON.stringify(fields),
					filters: JSON.stringify([["name", "=", `${tank_name}`]]),
				},
			});
		return tank.data.data;
	}
	//available within a shop
	async getTankDetails({ tank_name, fields }: GetTankDetailsDTO) {
		const tank: AxiosResponse<{ data: ReadTankDetailsModel[] }> =
			await this.tankInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(fields),
					filters: JSON.stringify([["name", "=", `${tank_name}`]]),
				},
			});
		return tank.data.data;
	}
	async getLatestTankReading({ tank, fields }: GetLatestTankReadingDTO) {
		const res: AxiosResponse<{ data: ReadTankReadingModel[] }> =
			await this.tankInstance.get(this.docType, {
				params: {
					filters: JSON.stringify([["tank", "=", tank]]),
					fields: JSON.stringify(fields), // [ ]Tank reading fields came from here
					order_by: "date desc",
					limit: 1,
				},
			});
		return res.data.data;
	}
	async createTankReading({ data }: { data: CreateTankReadingDTO }) {
		const res: AxiosResponse<{ data: CreatedTankReadingModel }> =
			await this.tankInstance.post(this.docType, { data });
		return res.data;
	}
	async getTankReadingType({ tank }: GetTankReadingTypeDTO) {
		const res: AxiosResponse<{ data: ReadTankReadingModel }> =
			await this.tankInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(["reading_type"]),
				},
			});
		return res.data.data;
	}
}
