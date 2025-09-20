import type { SortDTO } from "@/data-access/dto";
import type { CommonEntity } from "../common/common.entities";

export interface TankListFilterEntity extends CommonEntity {}

export interface CustomerTankFilterEntity extends TankListFilterEntity {
	customer_name?: string;
}
export interface TankListEntity {
	id: string;
	tank: string;
	name: string;
	customer_group: string;
}
export interface GetTankEntity {
	tank: string;
	fields: string[];
}

export interface GetTankReadingsEntity
	extends GetTankEntity,
		CommonEntity,
		SortDTO {}

export interface TankDetailsEntity {
	name: string;
	height: number;
	diameter: number;
	high: number;
	low: number;
	low_low: number;
	dead: number;
	tank_num: number;
	calibration: number;
	correction_factor: number;
}

export interface ListTankReadingEntity {
	opening_reading?: string;
	meter_reading: number;
	reading_type: string;
	height: number;
	volume: number;
	date?: string;
	status: string;
}

export interface TankReadingEntity {
	name: string;
	owner: string;
	creation: Date;
	modified: Date;
	modified_by: string;
	docstatus: number;
	idx: number;
	naming_series: string;
	tank: string;
	meter_reading: number;
	reading_type: string;
	height: number;
	volume: number;
	date: Date;
	status: string;
	doctype: string;
}

export interface CreateTankReadingEntity {
	tank: string;
	opening_tank_reading: number;
	meter_reading: number;
	reading_type: string;
	number_of_tanks: number;
	height: number;
	volume: number;
}
export interface UpdateTankReadingEntity extends TankReadingEntity {}
