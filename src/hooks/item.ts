//
// Get Selling Items

import { useAuth } from "@/components";
import { LeofreshError } from "@/lib/error";
import { ItemRepository } from "@/repository";
import { ItemPriceRepository } from "@/repository/item-price.repository";
import { ItemPriceUseCase } from "@/use-cases/item-price.use-case";
import { ItemUseCase } from "@/use-cases/item.use-case";
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

export function useListItems() {
	const { user } = useAuth();

	const { error, isLoading, data } = useQuery({
		queryKey: ["Items", user?.user.email],
		queryFn: async () => {
			const itemRepo = new ItemRepository();
			const itemUseCase = new ItemUseCase({ itemRepository: itemRepo });

			return itemUseCase.getItemsList();
		},
		enabled: !!user?.user.email,
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { data, isLoading };
}

export function useListManufacturingMaterials({
	limit_page_length,
}: {
	limit_page_length?: number;
}) {
	const { user } = useAuth();
	const { error, isLoading, data } = useQuery({
		queryKey: ["ManufacturingMaterials", user?.user.email],
		queryFn: async () => {
			const itemRepo = new ItemRepository();
			const itemUseCase = new ItemUseCase({ itemRepository: itemRepo });

			return itemUseCase.compileItemListData({
				limit_page_length: limit_page_length ?? 100,
			});
		},
		enabled: !!user?.user.email,
	});

	if (error instanceof Error) {
		throw new LeofreshError({ message: error.message });
	}

	return { data, isLoading };
}
