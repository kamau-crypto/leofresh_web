import { TankReading } from "@/data-access/api/tank.reading";
import type {
	CreateTankReadingEntity,
	GetTankReadingsEntity,
	ListTankReadingEntity,
	TankReadingEntity,
	UpdateTankReadingEntity,
} from "@/domain";

export interface ITankReadingRepository {
	createTankReading: (
		data: CreateTankReadingEntity
	) => Promise<TankReadingEntity>;
	listTankReadings: (
		params: Omit<GetTankReadingsEntity, "fields">
	) => Promise<ListTankReadingEntity[]>;
	updateTankReading: (
		data: UpdateTankReadingEntity
	) => Promise<TankReadingEntity>;
}

export class TankReadingRepository implements ITankReadingRepository {
	private tankReadingDataSource: TankReading;
	constructor() {
		this.tankReadingDataSource = new TankReading({ docType: "Tank Reading" });
	}
	async createTankReading(
		data: CreateTankReadingEntity
	): Promise<TankReadingEntity> {
		return await this.tankReadingDataSource.createTankReading({ data });
	}

	async updateTankReading(
		data: UpdateTankReadingEntity
	): Promise<TankReadingEntity> {
		return await this.tankReadingDataSource.updateTankReading(data);
	}

	async listTankReadings(
		params: Omit<GetTankReadingsEntity, "fields">
	): Promise<ListTankReadingEntity[]> {
		const fields = [
			"opening_reading",
			"meter_reading",
			"reading_type",
			"height",
			"volume",
			"date",
			"status",
		];
		return await this.tankReadingDataSource.getTankReadings({
			fields,
			...params,
		});
	}
}
