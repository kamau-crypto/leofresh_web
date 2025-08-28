export interface PaginationDTO {
	limit_start: number;
	limit_page_length: number;
}

export interface SortDTO {
	order_by: string;
}

// Re-use the above pagination DTOs for data transfer and movement across the app
