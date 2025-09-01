//
// Get Selling Items

import { useAuth } from "@/components";
import { LeofreshError } from "@/lib/error";
import { ItemPriceRepository } from "@/repository/item-price.repository";
import { ItemPriceUseCase } from "@/use-cases/item-price.use-case";
import { useQuery } from "@tanstack/react-query";

//
//Get buying Items

//
//Get all Items
const getItemMethods = async () => {
	const itemRepo = new ItemPriceRepository();
	const itemsUsecase = new ItemPriceUseCase({ itemRepository: itemRepo });

	const getAllItems = async () => await itemsUsecase.getItemsWithPrices();
	const getItemWithBuyingPrice = async () =>
		await itemsUsecase.getItemBuyingPriceLists();
	const sellingItemsWithPrice = async () =>
		await itemsUsecase.getItemSellingPriceLists();
	return { getAllItems, getItemWithBuyingPrice, sellingItemsWithPrice };
};

export function useListAllProducts() {
	const { user } = useAuth();
	const { isLoading, data, error } = useQuery({
		queryKey: ["AllProducts", user?.user.email],
		queryFn: async () => (await getItemMethods()).getAllItems(),
	});
	//Include frappe Error throwing mechanism
	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { isLoading, data };
}

export function useBuyingPriceProducts() {
	const { user } = useAuth();

	const { isLoading, data, error } = useQuery({
		queryKey: ["PurchaseProducts", user?.user.email],
		queryFn: async () => (await getItemMethods()).getItemWithBuyingPrice(),
	});
	//Include frappe Error throwing mechanism
	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { isLoading, data };
}

export function useSellingPriceProducts() {
	const { user } = useAuth();

	const { isLoading, data, error } = useQuery({
		queryKey: ["SellingProducts", user?.user.email],
		queryFn: async () => (await getItemMethods()).sellingItemsWithPrice(),
	});
	//Include frappe Error throwing mechanism
	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { isLoading, data };
}
