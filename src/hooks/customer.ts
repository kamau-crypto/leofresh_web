import { useAuth } from "@/components";
import type { CustomerFilterEntity } from "@/domain";
import { LeofreshError } from "@/lib/error";
import { CustomerRepository } from "@/repository";
import { CustomerUseCase } from "@/use-cases/customer.use-case";
import { useQuery } from "@tanstack/react-query";

//Get all customers
const getCustomers = async ({ filter }: { filter: CustomerFilterEntity }) => {
	const customerRepo = new CustomerRepository();
	const customers = new CustomerUseCase({ customerRepository: customerRepo });
	return await customers.getCustomers({ params: filter });
};

export function useListCustomers({ filter }: { filter: CustomerFilterEntity }) {
	const { user } = useAuth();
	const { isLoading, data, error } = useQuery({
		queryKey: ["customers", user?.user.email],
		queryFn: async () => {
			return await getCustomers({ filter });
		},
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { isLoading, data };
}
