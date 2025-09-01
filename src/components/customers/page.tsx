import type { CustomerFilterEntity } from "@/domain";
import { useListCustomers } from "@/hooks/customer";
import { useMemo, useState } from "react";
import { customerColumns } from "./columns";
import { DataTable } from "./data-table";

export function CustomersSearchableDataTable({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	const [filter, _setFilter] = useState<CustomerFilterEntity>({
		limit_page_length: 100,
		limit_start: 0,
		order_by: "creation desc",
	});
	const { data, isLoading } = useListCustomers({ filter });

	const memoizedData = useMemo(() => {
		return data;
	}, [data]);

	if (!data) {
		//  [ ] Present a better SVG component when there is no Data
		return <div>No data available</div>;
	}

	return (
		<div className='container mx-auto py-10 shadow-xl shadow-primary/10 rounded-xl p-3 overflow-y-hidden'>
			{(title || description) && (
				<div className='mb-6'>
					{title && (
						<h1 className='text-2xl font-bold text-gray-900 mb-2'>{title}</h1>
					)}
					{description && <p className='text-gray-600'>{description}</p>}
				</div>
			)}
			<div className='max-h-[800px] overflow-y-auto rounded-md'>
				<DataTable
					primaryFilter='name'
					filterPlaceHolder='Customer Name...'
					isLoading={isLoading}
					columns={customerColumns}
					data={memoizedData ?? []}
				/>
			</div>
		</div>
	);
}
