import type { CustomerTankFilterEntity, GetTankEntity } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { extractFrappeErrorMessage } from "@/lib/frappe_error_handler";
import type { TankRepository } from "@/repository/tank.repository";

export class TankUseCase {
	private tankRepository: TankRepository;
	constructor(tankRepository: TankRepository) {
		this.tankRepository = tankRepository;
	}
	async listCustomerTanks(params: Omit<CustomerTankFilterEntity, "fields">) {
		try {
			return await this.tankRepository.listCustomerTanks(params);
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}
	async listTankDetails(params: Omit<GetTankEntity, "fields">) {
		try {
			return await this.tankRepository.listTankDetails(params);
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}
	async createTank(params: any) {
		try {
			return await this.tankRepository.createTank(params);
		} catch (error) {
			throw new LeofreshError({ message: extractFrappeErrorMessage(error) });
		}
	}
}
