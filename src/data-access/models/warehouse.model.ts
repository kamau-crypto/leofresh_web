export interface ReadWarehousesListModel {
	name: string;
	is_group: number;
	parent_warehouse: null | string;
}



export interface ReadWarehouseStockLevelsModel {
	data: ReadWarehouseStockLevelModel[];
}

export interface ReadWarehouseStockLevelModel {
	item_code: string;
	warehouse: string;
	actual_qty: number;
	stock_uom: string;
}