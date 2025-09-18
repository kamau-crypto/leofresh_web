import type { PaginationDTO, SortDTO } from "../common/common.dto";

export interface MeterReadingDTO extends PaginationDTO, SortDTO {
	tank_name: string;
	fields: string[];
	filters?: [string];
}

export interface CreateMeterReadingDTO {
	quantity: number;
	cash: number;
	mpesa: number;
	waste: number;
	naming_series: string;
	variation: number;
	created_by: string;
	previous_reading: number;
	current_reading: number;
	status: string;
	tank: string;
}
