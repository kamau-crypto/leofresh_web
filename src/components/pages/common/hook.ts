import { useEffect, useState } from "react";
import type {
	FieldValues,
	Path,
	UseFormClearErrors,
	UseFormSetError,
	UseFormSetValue,
	UseFormWatch,
} from "react-hook-form";

interface ItemTotals {
	subtotal: number;
	taxTotal: number;
	discountTotal: number;
	grandTotal: number;
}

export function useCalculateItemTotalPrice<T extends FieldValues>({
	setError,
	setValue,
	watch,
	config = {
		qtyField: "qty",
		rateField: "rate",
		itemField: "items",
		discountField: "discount_percentage",
		taxRateField: "tax_rate",
		totalField: "amount",
		grandTotalField: "total",
		taxTotalField: "tax_amount",
		discountTotalField: "discount_amount",
		subtotalField: "subtotal",
		additionalDiscountField: "additional_discount_percentage",
		defaultTaxRate: 0.16, // 16% VAT by default
	},
}: {
	watch: UseFormWatch<T>;
	setValue: UseFormSetValue<T>;
	setError: UseFormSetError<T>;
	clearErrors: UseFormClearErrors<T>;
	config?: {
		itemField: string;
		qtyField: string;
		rateField: string;
		discountField: string;
		taxRateField: string;
		totalField: string;
		grandTotalField: string;
		taxTotalField: string;
		discountTotalField: string;
		subtotalField: string;
		additionalDiscountField: string;
		defaultTaxRate: number;
	};
}): { totals: ItemTotals } {
	// Watch for changes in items and additional discount
	const items = watch(
		config.itemField as keyof T as Path<T>
	) as unknown as Record<string, any>[];
	const additionalDiscount =
		Number(watch(config.additionalDiscountField as keyof T as Path<T>)) || 0;

	// State to store calculated totals
	const [totals, setTotals] = useState<ItemTotals>({
		subtotal: 0,
		taxTotal: 0,
		discountTotal: 0,
		grandTotal: 0,
	});

	// Calculate totals when items or additional discount changes
	useEffect(() => {
		if (!items || !Array.isArray(items)) return;

		let subtotal = 0;
		let totalTax = 0;
		let totalDiscount = 0;

		// Calculate each item's totals
		items.forEach((item, index) => {
			if (!item) return;

			// Get values with fallbacks to prevent NaN
			const qty = Number(item[config.qtyField] || 0);
			const rate = Number(item[config.rateField] || 0);
			const discountPercentage = Number(item[config.discountField] || 0);
			const taxRate = Number(
				item[config.taxRateField] || config.defaultTaxRate
			);

			if (qty < 0) {
				setError(`config.itemField.${index}.${config.qtyField}` as any, {
					type: "manual",
					message: "Quantity cannot be negative",
				});
				return;
			}
			if (rate < 0) {
				setError(`config.itemField.${index}.${config.rateField}` as any, {
					type: "manual",
					message: "Rate cannot be negative",
				});
				return;
			}
			// Calculate line amount before discount
			const lineAmount = qty * rate;

			// Calculate discount amount
			const discountAmount = (discountPercentage / 100) * lineAmount;

			// Calculate amount after discount
			const amountAfterDiscount = lineAmount - discountAmount;

			// Calculate tax amount (if taxable)
			const taxAmount = taxRate * amountAfterDiscount;

			// Set calculated values back to the form
			setValue(
				`items.${index}.${config.totalField}` as any,
				amountAfterDiscount as any
			);

			// If tax field exists, set it
			if (config.taxRateField) {
				setValue(
					`items.${index}.${config.taxTotalField}` as any,
					taxAmount as any
				);
			}

			// Accumulate totals
			subtotal += amountAfterDiscount;
			totalTax += taxAmount;
			totalDiscount += discountAmount;
		});

		// Calculate additional discount amount
		const additionalDiscountAmount = (additionalDiscount / 100) * subtotal;
		const finalSubtotal = subtotal - additionalDiscountAmount;

		// Calculate grand total
		const grandTotal = finalSubtotal + totalTax;

		// Update totals state
		const newTotals = {
			subtotal: finalSubtotal,
			taxTotal: totalTax,
			discountTotal: totalDiscount + additionalDiscountAmount,
			grandTotal: grandTotal,
		};

		setTotals(newTotals);

		// Update form with totals if fields exist at the root level
		if (config.subtotalField) {
			setValue(config.subtotalField as any, finalSubtotal as any);
		}

		if (config.taxTotalField) {
			setValue(config.taxTotalField as any, totalTax as any);
		}

		if (config.discountTotalField) {
			setValue(
				config.discountTotalField as any,
				(totalDiscount + additionalDiscountAmount) as any
			);
		}

		if (config.grandTotalField) {
			setValue(config.grandTotalField as any, grandTotal as any);
		}
	}, [items, additionalDiscount, setValue, config, watch]);

	return { totals };
}
