export type PaginationType<T> = {
    items: T[];
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    totalItems: number;
};

export const defaultPaginationData: PaginationType<any> = {
    items: [],
    currentPage: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalPages: 0,
    totalItems: 0,
};
