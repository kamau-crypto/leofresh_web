import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function toSentenceCase(str: string) {
	const lowerCase = str.toLowerCase();

	return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
}

export function convertToLocalCurrency(num: number) {
	return new Intl.NumberFormat("en-KE", {
		style: "currency",
		currency: "KES",
	}).format(num);
}
