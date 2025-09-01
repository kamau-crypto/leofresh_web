import type { AxiosInstance, AxiosResponse } from "axios";
import type { FrappeCreateRequirement } from "../common/frappe.create";
import type { CreateMeterReadingDTO, MeterReadingDTO } from "../dto";
import type {
	CreatedMeterReadingModel,
	ReadMeterReadingsModel,
} from "../models";
import { FrappeInstance } from "./frappe";

export class Meter extends FrappeInstance implements FrappeCreateRequirement {
	private docType: string;
	private meterInstance: AxiosInstance;
	constructor({ docType }: { docType: string }) {
		super();
		this.docType = docType;
		this.meterInstance = this.getFrappeClient();
	}

	async retrive_meter_readings({ tank_name, fields }: MeterReadingDTO) {
		const readings: AxiosResponse<ReadMeterReadingsModel> =
			await this.meterInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(fields),
					order_by: "date desc",
					filters: JSON.stringify([["tank", "=", `${tank_name}`]]),
					limit: 1,
				},
			});
		return readings.data.data;
	}
	async retrieveNamingSeries() {
		const naming_series: AxiosResponse<{ data: { naming_series: string } }> =
			await this.meterInstance.get(this.docType, {
				params: {
					fields: JSON.stringify(["naming_series"]),
					limit: 1,
				},
			});
		return naming_series.data.data;
	}
	async addMeterReadings({ data }: { data: CreateMeterReadingDTO }) {
		const reading: AxiosResponse<CreatedMeterReadingModel> =
			await this.meterInstance.post(this.docType, {
				data,
			});
		return reading.data;
	}
}
