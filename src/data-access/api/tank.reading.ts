import type { AxiosInstance, AxiosResponse } from "axios";
import type {
	CreateTankReadingDTO,
	GetLatestTankReadingDTO,
	UpdateTankReadingDTO,
} from "../dto";
import type { CreatedTankReadingModel, ReadTankReadingModel } from "../models";
import { FrappeInstance } from "./frappe";

export class TankReading extends FrappeInstance {
	private docType: string;
	private tankReadingInstance: AxiosInstance;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.tankReadingInstance = this.getFrappeClient();
	}

	async getTankReadings({ tank, fields }: GetLatestTankReadingDTO) {
		const res: AxiosResponse<{ data: ReadTankReadingModel[] }> =
			await this.tankReadingInstance.get(this.docType, {
				params: {
					filters: JSON.stringify([["tank", "=", tank]]),
					fields: JSON.stringify(fields),
					order_by: "date desc",
					limit: 1,
				},
			});
		return res.data.data;
	}
	async createTankReading({ data }: { data: CreateTankReadingDTO }) {
		const res: AxiosResponse<{ data: CreatedTankReadingModel }> =
			await this.tankReadingInstance.post(this.docType, { data });
		return res.data.data;
	}

	async updateTankReading({ name, ...data }: UpdateTankReadingDTO) {
		const res: AxiosResponse<{ data: CreatedTankReadingModel }> =
			await this.tankReadingInstance.post(`${this.docType}/${name}`, { data });
		return res.data.data;
	}
}
