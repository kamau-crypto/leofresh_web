export interface CreateStockMovementEntryDTO {
	naming_series?: string;
	stock_entry_type: string;
	material_request?: string;
	delivery_note?: string;
	driver_name?: string;
	reg_no?: string;
	items: CreateStockMovementEntryItemDTO[];
}

export interface CreateStockMovementEntryItemDTO {
	item_name: string;
	item_code: string;
	s_warehouse: string;
	t_warehouse: string;
	qty: number;
	uom: string;
	conversion_factor: number;
	basic_rate: number;
}
