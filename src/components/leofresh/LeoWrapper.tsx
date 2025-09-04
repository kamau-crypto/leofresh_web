type LeoWrapperProps = {
	title?: string;
	description?: string;
	HeaderButtons: React.ReactNode;
	Content: React.ReactNode;
};

export function LeoWrapper({
	title,
	description,
	HeaderButtons,
	Content,
}: LeoWrapperProps) {
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
			<div className='flex justify-end mb-4'>{HeaderButtons}</div>
			<div className='max-h-[80%] overflow-y-auto rounded-md'>{Content}</div>
		</div>
	);
}
