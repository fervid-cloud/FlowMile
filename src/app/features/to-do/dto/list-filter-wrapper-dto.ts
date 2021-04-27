import { CriteriaInfo } from '../model/list-filterWrapper';

export interface ListFilterSortPaginationWrapperDto {
    type: string;
    name?: string;
    sort: string;
    page?: number;
    pageSize?: number;
}


