export interface CreatePaymentEntryDTO {
	naming_series: string;
	party_name: string;
	payment_type: string;
	posting_date: string;
	company: string;
	mode_of_payment: string;
	party_type: string;
	party: string;
	paid_to: string;
	paid_from: string;
	paid_amount: number;
	received_amount: number;
	reference_no: string;
	reference_date: string;
	references?: CreatePaymentEntryReferenceDTO[]; //A payment can be created without a reference
	remarks: string;
	currency: string;
	cost_center: string;
	target_exchange_rate: number;
	project: string;
	unallocated_amount?: number;
	deductions?: [{ account: string; cost_center: string; amount: number }];
}

export interface CreatePaymentEntryReferenceDTO {
	reference_doctype: string;
	reference_name: string;
	total_amount: number;
	outstanding_amount?: number;
	discount_amount?: number;
	allocated_amount?: number;
}
