import { SupplierDataSource } from "@/data-access/api/supplier";
import type { SupplierEntity, SupplierFilterEntity } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { extractFrappeErrorMessage } from "@/lib/frappe_error_handler";

export interface ISupplierRepository {
	getAllSuppliers(filters: SupplierFilterEntity): Promise<SupplierEntity[]>;
}

export class SupplierRepository implements ISupplierRepository {
	private supplierDataSource: SupplierDataSource;
	constructor() {
		this.supplierDataSource = new SupplierDataSource({ docType: "Supplier" });
	}

	async getAllSuppliers({
		fields,
		limit_page_length,
		limit_start,
		order_by,
	}: SupplierFilterEntity) {
		try {
			return await this.supplierDataSource.getAllSuppliers({
				fields,
				limit_page_length,
				limit_start,
				order_by,
			});
		} catch (error) {
			const msg = extractFrappeErrorMessage(error);
			throw new LeofreshError({ message: msg });
		}
	}
}
