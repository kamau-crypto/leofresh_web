//

import { Tanks } from "@/data-access/api/tank";
import type {
	CustomerTankFilterEntity,
	GetTankEntity,
	TankDetailsEntity,
	TankListEntity,
} from "@/domain";

// Get tank Readings and meter readings;
export interface ITankRepository {
	listCustomerTanks(
		params: Omit<CustomerTankFilterEntity, "fields">
	): Promise<TankListEntity[]>;
	listTankDetails(
		params: Omit<GetTankEntity, "fields">
	): Promise<TankDetailsEntity>;
	createTank(data: any): Promise<string>;
}

export class TankRepository implements ITankRepository {
	constructor() {}

	async listCustomerTanks(params: Omit<CustomerTankFilterEntity, "fields">) {
		const fields = ["name", "customer_group", "tank"];
		const tank = new Tanks({ docType: "Customer" });

		const listTanks = await tank.getTanksWithCustomer({ ...params, fields });

		return this.mapToDomain(listTanks);
	}
	async listTankDetails(
		params: Omit<GetTankEntity, "fields">
	): Promise<TankDetailsEntity> {
		const fields = [
			"name",
			"height",
			"diameter",
			"high",
			"low",
			"low_low",
			"dead",
			"tank_num",
			"calibration",
			"correction_factor",
			"tank_num",
		];
		const tanks = new Tanks({ docType: "Tank" });

		return await tanks.getTankDetails({
			tank_name: params.tank,
			fields,
		});
	}

	async createTank(data: any): Promise<string> {
		const tanks = new Tanks({ docType: "Tank" });
		return await tanks.createTank(data);
	}

	mapToDomain(tanks: Omit<TankListEntity, "id">[]): TankListEntity[] {
		return tanks.map(tank => ({
			...tank,
			id: tank.name,
		}));
	}
}
