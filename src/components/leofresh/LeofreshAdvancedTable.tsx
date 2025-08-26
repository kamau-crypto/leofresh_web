import {
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	ChevronLeft,
	ChevronRight,
	Download,
	Eye,
	MoreHorizontal,
	RefreshCw,
	Search,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { LeoFreshBadge } from "./LeoBadge";
import { LeoButton } from "./LeoButton";
import { LeoDatePicker } from "./LeoDatePicker";

// const Input = ({
// 	placeholder,
// 	value,
// 	onChange,
// 	className = "",
// 	type = "text",
// }: {
// 	placeholder: string;
// 	value: string;
// 	onChange: React.ChangeEventHandler<HTMLInputElement>;
// 	className?: string;
// 	type?: string;
// }) => {
// 	return (
// 		<Input
// 			type={type}
// 			placeholder={placeholder}
// 			value={value}
// 			onChange={onChange}
// 			className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
// 		/>
// 	);
// };

// const Select = ({ children, value, onChange }) => {
// 	return (
// 		<select
// 			value={value}
// 			onChange={e => onChange(e.target.value)}
// 			className='flex h-10 items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
// 			{children}
// 		</select>
// 	);
// };

// const DropdownMenu = ({
// 	trigger,
// 	children,
// 	open,
// 	onOpenChange,
// }: {
// 	trigger: React.ReactNode;
// 	children: React.ReactNode;
// 	open: boolean;
// 	onOpenChange: (open: boolean) => void;
// }) => {
// 	return (
// 		<div className='relative'>
// 			<div onClick={() => onOpenChange(!open)}>{trigger}</div>
// 			{open && (
// 				<div className='absolute right-0 z-50 mt-2 w-48 rounded-md border border-slate-200 bg-white shadow-lg'>
// 					<div className='p-1'>{children}</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// const DropdownMenuItem = ({
// 	children,
// 	onClick,
// }: {
// 	children: React.ReactNode;
// 	onClick: React.MouseEventHandler<HTMLDivElement>;
// }) => {
// 	return (
// 		<div
// 			onClick={onClick}
// 			className='relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100'>
// 			{children}
// 		</div>
// 	);
// };

export interface DataTableProps<T = Record<string, any>> {
	data: T[];
	columns: {
		key: keyof T | string;
		header: string;
		render?: (value: any, row: T) => React.ReactNode;
		sortable?: boolean;
		className?: string;
	}[];
	title?: string;
	description?: string;
	searchable?: boolean;
	searchPlaceholder?: string;
	searchFields?: string[];
	filterable?: boolean;
	filters?: {
		key: string;
		label: string;
		allLabel?: string;
		options: { value: string; label: string }[];
		defaultValue?: string;
	}[];
	dateRange?: boolean;
	dateRangeField?: string; // Field in data to apply date range filter
	sortable?: boolean;
	selectable?: boolean;
	actions?: {
		label: string;
		icon?: React.ReactNode;
		onClick: (row: T) => void;
		className?: string;
	}[];
	exportable?: boolean;
	onExport?: () => void;
	defaultPageSize?: number;
	pageSizeOptions?: number[];
	className?: string;
}

// Reusable Data Table Component
const LeofreshDataTable = <T extends Record<string, any>>({
	data = [],
	columns = [],
	title,
	description,
	searchable = true,
	searchPlaceholder = "Search...",
	searchFields = [],
	filterable = true,
	filters = [],
	dateRange = false,
	dateRangeField = "createdAt",
	sortable = true,
	selectable = false,
	actions = [],
	exportable = false,
	onExport,
	defaultPageSize = 20,
	pageSizeOptions = [10, 20, 50, 100],
	className = "",
}: DataTableProps<T>) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(defaultPageSize);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filterValues, setFilterValues] = useState<Record<string, string>>({});
	const [dateFrom, setDateFrom] = useState<string>("");
	const [dateTo, setDateTo] = useState<string>("");
	const [sortConfig, setSortConfig] = useState<{
		key: string | null;
		direction: "asc" | "desc";
	}>({
		key: null,
		direction: "asc",
	});
	const [selectedRows, setSelectedRows] = useState<Set<number | string>>(
		new Set()
	);
	const [dropdownOpen, setDropdownOpen] = useState<number | string | null>(
		null
	);

	// Initialize filter values
	React.useEffect(() => {
		const initialFilters: Record<string, string> = {};
		filters.forEach(filter => {
			initialFilters[filter.key] = filter.defaultValue || "all";
		});
		setFilterValues(initialFilters);
	}, [filters]);

	// Filter and sort data
	const filteredAndSortedData = useMemo(() => {
		const filtered = data.filter(item => {
			// Search filter
			if (searchable && searchTerm && searchFields.length > 0) {
				const matchesSearch = searchFields.some(field => {
					// safe access: cast to any since keys may be dynamic
					const val = (item as any)[field];
					return String(val || "")
						.toLowerCase()
						.includes(searchTerm.toLowerCase());
				});
				if (!matchesSearch) return false;
			}

			// Custom filters
			if (filterable && filters.length > 0) {
				const matchesFilters = filters.every(filter => {
					const filterValue = filterValues[filter.key];
					if (!filterValue || filterValue === "all") return true;
					return (item as any)[filter.key] === filterValue;
				});
				if (!matchesFilters) return false;
			}

			// Date range filter
			if (dateRange && dateRangeField && (dateFrom || dateTo)) {
				const itemDate = (item as any)[dateRangeField];
				// allow string/Date numeric timestamps as well
				const parsedDate =
					itemDate instanceof Date
						? itemDate
						: itemDate
							? new Date(itemDate)
							: null;
				if (!parsedDate) return true;

				if (dateFrom && parsedDate < new Date(dateFrom)) return false;
				if (dateTo && parsedDate > new Date(dateTo + "T23:59:59")) return false;
			}

			return true;
		});

		// Sort data
		if (sortable && sortConfig.key) {
			filtered.sort((a, b) => {
				const aRaw = (a as any)[sortConfig.key as string];
				const bRaw = (b as any)[sortConfig.key as string];

				let aValue: any = aRaw;
				let bValue: any = bRaw;

				if (aValue instanceof Date && bValue instanceof Date) {
					aValue = aValue.getTime();
					bValue = bValue.getTime();
				}

				// handle undefined/null
				if (aValue == null && bValue == null) return 0;
				if (aValue == null) return sortConfig.direction === "asc" ? -1 : 1;
				if (bValue == null) return sortConfig.direction === "asc" ? 1 : -1;

				// numbers
				if (typeof aValue === "number" && typeof bValue === "number") {
					return sortConfig.direction === "asc"
						? aValue - bValue
						: bValue - aValue;
				}

				// dates (ts) already handled, fallback to string comparison
				const aStr = String(aValue);
				const bStr = String(bValue);
				return sortConfig.direction === "asc"
					? aStr.localeCompare(bStr)
					: bStr.localeCompare(aStr);
			});
		}

		return filtered;
	}, [
		data,
		searchTerm,
		filterValues,
		dateFrom,
		dateTo,
		sortConfig,
		searchable,
		searchFields,
		filterable,
		filters,
		dateRange,
		dateRangeField,
		sortable,
	]);

	// Pagination
	const totalPages = Math.max(
		1,
		Math.ceil(filteredAndSortedData.length / itemsPerPage)
	);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedData = filteredAndSortedData.slice(
		startIndex,
		startIndex + itemsPerPage
	);

	const handleSort = (key: string) => {
		if (!sortable) return;
		setSortConfig(prev => ({
			key,
			direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
		}));
	};

	const getSortIcon = (key: string) => {
		if (!sortable || sortConfig.key !== key)
			return <ArrowUpDown className='h-4 w-4' />;
		return sortConfig.direction === "asc" ? (
			<ArrowUp className='h-4 w-4' />
		) : (
			<ArrowDown className='h-4 w-4' />
		);
	};

	const toggleRowSelection = (id: number | string) => {
		if (!selectable) return;
		const newSelection = new Set(selectedRows);
		if (newSelection.has(id)) {
			newSelection.delete(id);
		} else {
			newSelection.add(id);
		}
		setSelectedRows(newSelection);
	};

	const toggleAllRows = () => {
		if (!selectable) return;
		if (selectedRows.size === paginatedData.length) {
			setSelectedRows(new Set());
		} else {
			setSelectedRows(new Set(paginatedData.map(item => (item as any).id)));
		}
	};

	const clearFilters = () => {
		setSearchTerm("");
		const clearedFilters: Record<string, string> = {};
		filters.forEach(filter => {
			clearedFilters[filter.key] = filter.defaultValue || "all";
		});
		setFilterValues(clearedFilters);
		setDateFrom("");
		setDateTo("");
		setSortConfig({ key: null, direction: "asc" });
		setCurrentPage(1);
	};

	const updateFilter = (key: string, value: string) => {
		setFilterValues(prev => ({ ...prev, [key]: value }));
		setCurrentPage(1);
	};

	return (
		<div className={`w-full bg-white ${className}`}>
			{/* Header */}
			{(title || description) && (
				<div className='mb-6'>
					{title && (
						<h1 className='text-2xl font-bold text-gray-900 mb-2'>{title}</h1>
					)}
					{description && <p className='text-gray-600'>{description}</p>}
				</div>
			)}

			{/* Filters and Actions */}
			{(searchable || filterable || dateRange || exportable) && (
				<div className='mb-6 space-y-4'>
					<div className='flex flex-col sm:flex-row gap-4'>
						{searchable && (
							<div className='flex-1 relative'>
								<Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
								{/* keep generic typing for Input onChange usage */}
								<input
									placeholder={searchPlaceholder}
									value={searchTerm}
									onChange={e =>
										setSearchTerm((e.target as HTMLInputElement).value)
									}
									className='pl-10 h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm'
								/>
							</div>
						)}

						{filterable &&
							filters.map(filter => (
								<select
									key={filter.key}
									value={filterValues[filter.key] || "all"}
									onChange={e => updateFilter(filter.key, e.target.value)}
									className='flex h-10 items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm'>
									<option value='all'>
										{filter.allLabel || `All ${filter.label}`}
									</option>
									{filter.options.map(option => (
										<option
											key={option.value}
											value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							))}
					</div>

					{(dateRange || exportable) && (
						<div className='flex flex-col sm:flex-row gap-4 items-end'>
							{dateRange && (
								<>
									<div>
										<label className='block text-sm font-medium mb-2'>
											Date From
										</label>
										<LeoDatePicker
											value={dateFrom}
											onChange={setDateFrom}
										/>
									</div>

									<div>
										<label className='block text-sm font-medium mb-2'>
											Date To
										</label>
										<LeoDatePicker
											value={dateTo}
											onChange={setDateTo}
										/>
									</div>
								</>
							)}

							<div className='flex gap-2'>
								<LeoButton
									variant='outline'
									onClick={clearFilters}>
									<RefreshCw className='h-4 w-4 mr-2' />
									Clear Filters
								</LeoButton>

								{exportable && (
									<LeoButton
										variant='outline'
										onClick={onExport}>
										<Download className='h-4 w-4 mr-2' />
										Export
									</LeoButton>
								)}
							</div>
						</div>
					)}
				</div>
			)}

			{/* Table */}
			<div className='border border-gray-200 rounded-lg overflow-hidden'>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead className='bg-gray-50'>
							<tr>
								{/* Remove selectable check, always show selectedRows if > 0 */}
								{selectedRows.size > 0 && (
									<th className='px-4 py-3 text-left'>
										<input
											type='checkbox'
											checked={
												selectedRows.size === paginatedData.length &&
												paginatedData.length > 0
											}
											onChange={toggleAllRows}
											className='rounded border-gray-300'
										/>
									</th>
								)}
								{columns.map(column => (
									<th
										key={String(column.key)}
										className='px-4 py-3 text-left'>
										{column.sortable !== false && sortable ? (
											<Button
												variant='ghost'
												size='sm'
												onClick={() => handleSort(String(column.key))}
												className='font-medium text-gray-900 hover:bg-transparent p-0'>
												{column.header} {getSortIcon(String(column.key))}
											</Button>
										) : (
											<span className='font-medium text-gray-900'>
												{column.header}
											</span>
										)}
									</th>
								))}
								{actions.length > 0 && (
									<th className='px-4 py-3 text-left font-medium text-gray-900'>
										Actions
									</th>
								)}
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-200'>
							{paginatedData.map(item => (
								<tr
									key={(item as any).id ?? Math.random()}
									className='hover:bg-gray-50'>
									{selectable && (
										<td className='px-4 py-3'>
											<input
												type='checkbox'
												checked={selectedRows.has((item as any).id)}
												onChange={() => toggleRowSelection((item as any).id)}
												className='rounded border-gray-300'
											/>
										</td>
									)}
									{columns.map(column => (
										<td
											key={String(column.key)}
											className={`px-4 py-3 ${column.className || ""}`}>
											{column.render
												? column.render((item as any)[String(column.key)], item)
												: (item as any)[String(column.key)]}
										</td>
									))}
									{actions.length > 0 && (
										<td className='px-4 py-3'>
											{/* simple dropdown implementation */}
											<div className='relative'>
												<div
													onClick={() =>
														setDropdownOpen(prev =>
															prev === (item as any).id
																? null
																: (item as any).id
														)
													}>
													<Button
														variant='ghost'
														size='icon'>
														<MoreHorizontal className='h-4 w-4' />
													</Button>
												</div>
												{dropdownOpen === (item as any).id && (
													<div className='absolute right-0 z-50 mt-2 w-48 rounded-md border border-slate-200 bg-white shadow-lg'>
														<div className='p-1'>
															{actions.map((action, index) => (
																<div
																	key={index}
																	onClick={() => {
																		action.onClick(item);
																		setDropdownOpen(null);
																	}}
																	className='relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100'>
																	{action.icon && (
																		<span className='mr-2'>{action.icon}</span>
																	)}
																	<span className={action.className}>
																		{action.label}
																	</span>
																</div>
															))}
														</div>
													</div>
												)}
											</div>
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Pagination */}
			<div className='mt-6 flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<span className='text-sm text-gray-600'>
						Showing {startIndex + 1} to{" "}
						{Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)}{" "}
						of {filteredAndSortedData.length} results
					</span>
					{selectable && selectedRows.size > 0 && (
						<span className='text-sm text-blue-600'>
							({selectedRows.size} selected)
						</span>
					)}
				</div>

				<div className='flex items-center gap-4'>
					<div className='flex items-center gap-2'>
						<span className='text-sm text-gray-600'>Rows per page:</span>
						<select
							value={itemsPerPage.toString()}
							onChange={e => setItemsPerPage(parseInt(e.target.value))}
							className='flex h-10 items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm'>
							{pageSizeOptions.map(option => (
								<option
									key={option}
									value={option}>
									{option}
								</option>
							))}
						</select>
					</div>

					<div className='flex items-center gap-2'>
						<Button
							variant='outline'
							size='sm'
							onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
							disabled={currentPage === 1}>
							<ChevronLeft className='h-4 w-4' />
							Previous
						</Button>

						<div className='flex items-center gap-1'>
							{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
								const pageNum = i + 1;
								return (
									<Button
										key={pageNum}
										variant={currentPage === pageNum ? "default" : "outline"}
										size='sm'
										onClick={() => setCurrentPage(pageNum)}
										className='w-10'>
										{pageNum}
									</Button>
								);
							})}
							{totalPages > 5 && <span className='px-2'>...</span>}
						</div>

						<Button
							variant='outline'
							size='sm'
							onClick={() =>
								setCurrentPage(Math.min(totalPages, currentPage + 1))
							}
							disabled={currentPage === totalPages}>
							Next
							<ChevronRight className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

// Example Usage Component
export default function TableExample() {
	// Mock data
	const mockData = Array.from({ length: 100 }, (_, i) => ({
		id: i + 1,
		name: `User ${i + 1}`,
		email: `user${i + 1}@example.com`,
		status: ["active", "inactive", "pending"][Math.floor(Math.random() * 3)],
		role: ["admin", "user", "manager"][Math.floor(Math.random() * 3)],
		createdAt: new Date(
			2024,
			Math.floor(Math.random() * 12),
			Math.floor(Math.random() * 28) + 1
		),
		lastLogin: new Date(
			2024,
			Math.floor(Math.random() * 12),
			Math.floor(Math.random() * 28) + 1
		),
		amount: Math.floor(Math.random() * 10000) + 100,
	}));

	// Utility functions
	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("en-Ke", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	};

	const formatAmount = (amount: number) => {
		return new Intl.NumberFormat("en-Ke", {
			style: "currency",
			currency: "KES",
		}).format(amount);
	};

	// Table configuration
	const columns = [
		{
			key: "name",
			header: "Name",
			render: (value: string) => (
				<span className='font-medium text-gray-900'>{value}</span>
			),
		},
		{
			key: "email",
			header: "Email",
			render: (value: string) => <span className='text-gray-600'>{value}</span>,
		},
		{
			key: "status",
			header: "Status",
			sortable: false,
			render: (value: string) => {
				const variants: Record<string, string> = {
					active: "success",
					inactive: "error",
					pending: "warning",
				};
				return (
					<LeoFreshBadge variant={variants[value]}>
						{value.charAt(0).toUpperCase() + value.slice(1)}
					</LeoFreshBadge>
				);
			},
		},
		{
			key: "role",
			header: "Role",
			render: (value: string) => (
				<span className='capitalize text-gray-600'>{value}</span>
			),
		},
		{
			key: "createdAt",
			header: "Created",
			render: (value: Date) => (
				<span className='text-gray-600 text-sm'>{formatDate(value)}</span>
			),
		},
		{
			key: "lastLogin",
			header: "Last Login",
			render: (value: Date) => (
				<span className='text-gray-600 text-sm'>{formatDate(value)}</span>
			),
		},
		{
			key: "amount",
			header: "Amount",
			render: (value: number) => (
				<span className='text-gray-900 font-medium'>{formatAmount(value)}</span>
			),
		},
	];

	const filters = [
		{
			key: "status",
			label: "Status",
			allLabel: "All Status",
			options: [
				{ value: "active", label: "Active" },
				{ value: "inactive", label: "Inactive" },
				{ value: "pending", label: "Pending" },
			],
		},
		{
			key: "role",
			label: "Role",
			allLabel: "All Roles",
			options: [
				{ value: "admin", label: "Admin" },
				{ value: "user", label: "User" },
				{ value: "manager", label: "Manager" },
			],
		},
	];

	interface TableAction {
		label: string;
		icon?: React.ReactNode;
		onClick: (item: {
			id: number;
			name: string;
			email: string;
			status: string;
			role: string;
			createdAt: Date;
			lastLogin: Date;
			amount: number;
		}) => void;
		className?: string;
	}

	const actions: TableAction[] = [
		{
			label: "View Details",
			icon: <Eye className='h-4 w-4' />,
			onClick: item => console.log("View", item.id),
		},
		{
			label: "Edit User",
			onClick: item => console.log("Edit", item.id),
		},
		{
			label: "Delete User",
			className: "text-red-600",
			onClick: item => console.log("Delete", item.id),
		},
	];

	const handleExport = () => {
		console.log("Exporting data...");
	};

	return (
		<div className='max-w-7xl mx-auto p-6'>
			<LeofreshDataTable
				data={mockData}
				columns={columns}
				title='User Management'
				description='Manage and monitor user accounts with advanced filtering and pagination.'
				searchable={true}
				searchPlaceholder='Search users...'
				searchFields={["name", "email"]}
				filterable={true}
				filters={filters}
				dateRange={true}
				dateRangeField='createdAt'
				sortable={true}
				selectable={true}
				actions={actions}
				exportable={true}
				onExport={handleExport}
				defaultPageSize={20}
				pageSizeOptions={[10, 20, 50, 100]}
			/>
		</div>
	);
}
