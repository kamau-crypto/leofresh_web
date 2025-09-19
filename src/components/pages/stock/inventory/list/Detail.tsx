import { LeoFreshCard } from "@/components/leofresh";
import type { DetailedListBinEntity } from "@/domain";

export function StockLevelDetails({
	itemDetails,
}: {
	itemDetails: DetailedListBinEntity;
}) {
	const {
		item_code,
		item_group,
		warehouse,
		actual_qty,
		stock_uom,
		image,
		ordered_qty,
		reserved_qty,
		reserved_stock,
		reserved_qty_for_production,
	} = itemDetails;
	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
			<LeoFreshCard
				content={
					<div>
						<span>
							{image ? (
								<img
									src={image}
									alt={item_code}
									className='size-6 mr-2'
								/>
							) : (
								<div className='size-6 mr-2 bg-gray-200 flex items-center justify-center'>
									No Image
								</div>
							)}
						</span>
						<span className='text-lg font-medium mb-2'>{item_code}</span>
						<p>Item Code: {item_code}</p>
					</div>
				}
				title='Item Details'
			/>
			<LeoFreshCard
				content={
					<div>
						<p>Item Group: {item_group}</p>
					</div>
				}
				title='Item Group'
			/>
			<LeoFreshCard
				content={
					<div>
						<p>Warehouse: {warehouse}</p>
					</div>
				}
				title='Warehouse'
			/>
			<LeoFreshCard
				content={
					<div>
						<p>Warehouse: {warehouse}</p>
					</div>
				}
				title='Warehouse'
			/>
			<LeoFreshCard
				content={
					<div>
						<p>
							Stock Qty: {actual_qty} {stock_uom}
						</p>
						<p>
							Ordered Qty: {ordered_qty} {stock_uom}
						</p>
						<p>
							Available Stock: {actual_qty} {stock_uom}
						</p>
					</div>
				}
				title='Available Stock'
			/>
			<LeoFreshCard
				content={
					<div>
						<p>
							Reserved Qty: {reserved_qty} {stock_uom}
						</p>
						<p>
							Reserved Qty for Production: {reserved_qty_for_production}{" "}
							{stock_uom}
						</p>
						<p>
							Reserved Stock: {reserved_stock} {stock_uom}
						</p>
					</div>
				}
				title='Reserved Stock'
			/>
		</div>
	);
}
