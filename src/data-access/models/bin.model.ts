export interface BinModel {
	item_code: string;
	warehouse: string;
	actual_qty?: number;
	planned_qty?: number;
	indented_qty?: number;
	ordered_qty?: number;
	projected_qty?: number;
	reserved_qty?: number;
	reserved_qty_for_production?: number;
	reserved_qty_for_sub_contract?: number;
	reserved_qty_for_production_plan?: number;
	reserved_stock?: number;
	stock_uom?: string;
	valuation_rate?: number;
	stock_value?: number;
}
