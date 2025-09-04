import { useAuth } from "@/components";
import type { SupplierFilterEntity } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { SupplierRepository } from "@/repository";
import { SupplierUseCase } from "@/use-cases/supplier.use-case";
import { useQuery } from "@tanstack/react-query";

async function getSuppliers({
	limit_page_length,
	limit_start,
	order_by,
}: Omit<SupplierFilterEntity, "fields">) {
	const supplierRepo = new SupplierRepository();
	const suppliers = new SupplierUseCase({ supplierRepository: supplierRepo });
	return await suppliers.getAllSuppliers({
		limit_page_length,
		limit_start,
		order_by,
	});
}

export function useListSuppliers({
	supplierParams,
}: {
	supplierParams: Omit<SupplierFilterEntity, "fields">;
}) {
	const { user } = useAuth();
	const { data, error, isLoading } = useQuery({
		queryKey: ["suppliers", user?.user.email],
		queryFn: async () => {
			const { limit_page_length, limit_start, order_by } = supplierParams;
			return await getSuppliers({
				limit_page_length: limit_page_length || 100,
				limit_start: limit_start || 0,
				order_by: order_by || "modified desc",
			});
		},
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { isLoading, data };
}
