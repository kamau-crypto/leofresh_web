import type { PaginationDTO, SortDTO } from "../common/common.dto";

export interface GetTanksDTO extends PaginationDTO, SortDTO {
	fields: string[];
}

export interface GetTankDTO {
	fields: string[];
	tank_name: string;
	filters: string[];
}

export interface GetTankDetailsDTO {
	tank_name: string;
	fields: string[];
}

export interface GetLatestTankReadingDTO {
	tank: string;
	fields: string[];
}

export interface GetTankReadingTypeDTO {
	tank: string;
}

export interface CreateTankReadingDTO {
	tank: string;
	opening_tank_reading: number;
	meter_reading: number;
	reading_type: string;
	number_of_tanks: number;
	height: number;
	volume: number;
}
