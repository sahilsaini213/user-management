import { FilterMetadata, LazyLoadEvent, SortMeta } from "primeng/api";

export interface LazyLoadRequest{
    offset?: number;
    last?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: string;
    multi_sort_meta?: SortMeta[];
    filters?: {
        [s: string]: FilterMetadata;
    };
    global_filter?: any;
}

export function toRequestParams(event?: LazyLoadEvent): LazyLoadRequest {
    if(!event) return null;
    return {
        offset: event.first,
        limit: event.rows,
        last: event.last,
        sort_by: event.sortField,
        sort_order: event.sortOrder === 1 ? 'asc' : 'desc',
        multi_sort_meta: event.multiSortMeta,
        filters: event.filters,
        global_filter: event.globalFilter
    }
}