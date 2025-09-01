import type { CreateMeterReadingDTO } from "@/data-access/dto";
import type {
	CreatedMeterReadingModel,
	ReadMeterReadingModel,
} from "@/data-access/models";

export interface IMeterReadingRepository {
	create(data: CreateMeterReadingDTO): Promise<CreatedMeterReadingModel>;
	retrieve(
		tank_name: string,
		fields: string[],
		filters?: [string]
	): Promise<ReadMeterReadingModel[]>;
	update(): Promise<void>;
	delete(): Promise<void>;
}
export class MeterReadingRepository implements IMeterReadingRepository {
	constructor() {}
	async create(data: CreateMeterReadingDTO): Promise<CreatedMeterReadingModel> {
		// Implementation for creating a meter reading
	}

	async retrieve(
		tank_name: string,
		fields: string[],
		filters?: [string]
	): Promise<ReadMeterReadingModel[]> {
		// Implementation for retrieving meter readings
	}
}
