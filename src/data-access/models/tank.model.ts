export interface ReadCustomerTankModel {
	tank: string;
	name: string;
	customer_group: string;
}

export interface ReadTankDetailsModel {
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
export interface CreatedTankReadingModel {
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

export interface ReadTankReadingsModel {
	data: ReadTankReadingModel[];
}

export interface ReadTankReadingModel {
	opening_reading?: string;
	meter_reading: number;
	reading_type: string;
	height: number;
	volume: number;
	date?: string;
	status: string;
}

export interface ReadCustomerTankModel {
	tank: string;
}

export interface ReadTankDetailsModel {
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
