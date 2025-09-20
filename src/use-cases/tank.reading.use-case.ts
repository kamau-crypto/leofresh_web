import type {
	CreateTankReadingEntity,
	GetTankReadingsEntity,
	UpdateTankReadingEntity,
} from "@/domain";
import { LeofreshError } from "@/lib/error";
import { extractFrappeErrorMessage } from "@/lib/frappe_error_handler";
import type { TankReadingRepository } from "@/repository/tank.reading.repository";

export class TankReadingUseCase {
	private tankReadingRepository: TankReadingRepository;

	constructor(tankReadingRepository: TankReadingRepository) {
		this.tankReadingRepository = tankReadingRepository;
	}

	async createTankReading(data: CreateTankReadingEntity) {
		try {
			return await this.tankReadingRepository.createTankReading(data);
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}

	async listTankReadings(params: Omit<GetTankReadingsEntity, "fields">) {
		try {
			return await this.tankReadingRepository.listTankReadings(params);
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}

	async updateTankReading(data: UpdateTankReadingEntity) {
		try {
			return await this.tankReadingRepository.updateTankReading(data);
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}
}
