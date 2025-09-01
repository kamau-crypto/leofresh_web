export interface ReadMeterReadingsModel {
	data: ReadMeterReadingModel[];
}

export interface ReadMeterReadingModel {
	name: string;
	quantity: string;
	variation: string;
	previous_reading: string;
	current_reading: string;
	created_by: string;
	date: Date;
	tank: string;
}

export interface CreatedMeterReadingModel {
	data: CreatedMeterReadingValueModel;
}

export interface CreatedMeterReadingValueModel {
	name: string;
	owner: string;
	creation: Date;
	modified: Date;
	modified_by: string;
	docstatus: number;
	idx: number;
	naming_series: string;
	quantity: number;
	variation: number;
	previous_reading: number;
	current_reading: number;
	created_by: string;
	date: Date;
	status: string;
	tank: string;
	doctype: string;
}
