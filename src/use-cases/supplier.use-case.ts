import type { SupplierEntity, SupplierFilterEntity } from "@/domain";
import type { ISupplierRepository } from "@/repository/supplier.repository";

export class SupplierUseCase {
	private supplierRepository: ISupplierRepository;

	constructor({
		supplierRepository,
	}: {
		supplierRepository: ISupplierRepository;
	}) {
		this.supplierRepository = supplierRepository;
	}

	async getAllSuppliers({
		limit_page_length,
		limit_start,
		order_by,
	}: Omit<SupplierFilterEntity, "fields">): Promise<SupplierEntity[]> {
		const fields = [
			"supplier_name",
			"supplier_type",
			"mobile_no",
			"supplier_group",
			"modified",
		];
		return await this.supplierRepository.getAllSuppliers({
			fields,
			limit_page_length,
			limit_start,
			order_by,
		});
	}
}
