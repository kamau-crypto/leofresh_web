import { LeoButton } from "@/components/leofresh/LeoButton.tsx";
import { PlusCircle } from "lucide-react";
import { ItemList } from "./list/itemList.tsx";

export function ItemsPage({
	title,
	description,
}: {
	title?: string;
	description?: string;
}) {
	return (
		<div className='container mx-auto py-10 shadow-xl shadow-primary/10 rounded-xl p-3 overflow-y-hidden'>
			{(title || description) && (
				<div className='mb-6 w-full flex flex-col'>
					{title && (
						<h1 className='text-2xl font-bold text-gray-900 mb-2'>{title}</h1>
					)}
					{description && <p className='text-gray-600'>{description}</p>}
				</div>
			)}
			{/* Button aligned to the right */}
			<div className='flex justify-end mb-4'>
				<LeoButton variant='default'>
					Add Item <PlusCircle className='ml-2 w-4 h-4' />
				</LeoButton>
			</div>
			<div className='max-h-[80%] overflow-y-auto rounded-md'>
				<ItemList />
			</div>
		</div>
	);
}
