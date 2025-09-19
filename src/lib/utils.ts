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

export function formatToLocalCurrency(num: number) {
	return new Intl.NumberFormat("en-KE", {
		style: "currency",
		currency: "KES",
	}).format(num);
}

export function convertToLocalDate(isoString: string) {
	const date = new Date(isoString);
	return date.toLocaleDateString("en-KE", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
		timeZone: "Africa/Nairobi",
	});
}

export function base64ToBytes(base64: any) {
	const binString = atob(base64);
	return Uint8Array.from(binString, m => m.charCodeAt(0));
}

export function bytesToBase64(bytes: any) {
	const binString = Array.from(bytes, byte =>
		String.fromCodePoint(Number(byte))
	).join("");
	return btoa(binString);
}
