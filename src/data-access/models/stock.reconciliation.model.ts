export interface CreatedStockReconciliationsModel {
	data: CreatedStockReconciliationModel;
}

export interface CreatedStockReconciliationModel {
	name: string;
	owner: string;
	creation: Date;
	modified: Date;
	modified_by: string;
	docstatus: number;
	idx: number;
	naming_series: string;
	company: string;
	purpose: string;
	posting_date: Date;
	posting_time: string;
	set_posting_time: number;
	set_warehouse: string;
	scan_mode: number;
	expense_account: string;
	difference_amount: number;
	cost_center: string;
	doctype: string;
	items: CreatedReconciliationItemModel[];
}

export interface CreatedReconciliationItemModel {
	name: string;
	owner: string;
	creation: Date;
	modified: Date;
	modified_by: string;
	docstatus: number;
	idx: number;
	item_code: string;
	item_name: string;
	item_group: string;
	warehouse: string;
	qty: number;
	valuation_rate: number;
	amount: number;
	allow_zero_valuation_rate: number;
	use_serial_batch_fields: number;
	reconcile_all_serial_batch: number;
	current_qty: number;
	current_amount: number;
	current_valuation_rate: number;
	quantity_difference: number;
	amount_difference: number;
	parent: string;
	parentfield: string;
	parenttype: string;
	doctype: string;
	__unsaved: number;
}

export interface SubmittedStockReconciliationModel {
	message: StockReconciliationModel;
}

export interface StockReconciliationModel {
	name: string;
	owner: string;
	creation: Date;
	modified: Date;
	modified_by: string;
	docstatus: number;
	idx: number;
	naming_series: string;
	company: string;
	purpose: string;
	posting_date: Date;
	posting_time: string;
	set_posting_time: number;
	set_warehouse: string;
	scan_barcode: null;
	scan_mode: number;
	expense_account: string;
	difference_amount: number;
	amended_from: null;
	cost_center: string;
	doctype: string;
	items: SubmittedStockReconciliationItemModel[];
}

export interface SubmittedStockReconciliationItemModel {
	name: string;
	owner: string;
	creation: Date;
	modified: Date;
	modified_by: string;
	docstatus: number;
	idx: number;
	barcode: null;
	has_item_scanned: null;
	item_code: string;
	item_name: string;
	item_group: string;
	warehouse: string;
	qty: number;
	valuation_rate: number;
	amount: number;
	allow_zero_valuation_rate: number;
	use_serial_batch_fields: number;
	reconcile_all_serial_batch: number;
	serial_and_batch_bundle: null;
	current_serial_and_batch_bundle: null;
	serial_no: null;
	batch_no: null;
	current_qty: number;
	current_amount: number;
	current_valuation_rate: number;
	current_serial_no: null;
	quantity_difference: number;
	amount_difference: number;
	parent: string;
	parentfield: string;
	parenttype: string;
	doctype: string;
	__unsaved: number;
}

export interface RetrievedStockReconciliationModel {
	name: string;
	posting_date: Date;
	posting_time: string;
}

export interface ReadStockReconiliationModel {
	name: string;
	owner: string;
	creation: Date;
	modified: Date;
	modified_by: string;
	docstatus: number;
	idx: number;
	naming_series: string;
	company: string;
	purpose: string;
	posting_date: Date;
	posting_time: string;
	set_posting_time: number;
	set_warehouse: string;
	scan_mode: number;
	expense_account: string;
	difference_amount: number;
	cost_center: string;
	doctype: string;
	items: ReadStockReconiliationItemModel[];
}

export interface ReadStockReconiliationItemModel {
	name: string;
	owner: string;
	creation: Date;
	modified: Date;
	modified_by: string;
	docstatus: number;
	idx: number;
	item_code: string;
	item_name: string;
	item_group: string;
	warehouse: string;
	qty: number;
	valuation_rate: number;
	amount: number;
	allow_zero_valuation_rate: number;
	use_serial_batch_fields: number;
	reconcile_all_serial_batch: number;
	current_qty: number;
	current_amount: number;
	current_valuation_rate: number;
	quantity_difference: string;
	amount_difference: number;
	parent: string;
	parentfield: string;
	parenttype: string;
	doctype: string;
}
