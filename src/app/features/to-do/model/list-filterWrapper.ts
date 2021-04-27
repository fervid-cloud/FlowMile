// GET /users?sort=first_name:asc,age:desc // can then later be split by ',' in backend
/*Date (range)
If you need a range between two dates, you can use start and end, or since and to.

    GET /users?start=01-01-1970&end=09-09-2020*/
export interface ListFilterSortPaginationWrapper {
    type?: CriteriaInfo;
    name?: string;
    sort?: CriteriaInfo;
    page?: number;
    pageSize?: number;

}

export interface CriteriaInfo {
    id: number;
    name: string;
    shortName: string;

}

export const sortCriteriaInfoList: CriteriaInfo [] = [
    {
        name: 'Last Created',
        id: 1,
        shortName: 'creationTime:desc',
    },
    {
        name: 'Last Updated',
        id: 2,
        shortName: 'modifiedTime:desc',
    },

    {
        name: 'Name ascending',
        id: 3,
        shortName: 'name:asc',
    },
    {
        name: 'Name descending',
        id: 4,
        shortName: 'name:desc'
    }

];

export const typeCriteriaInfoList: CriteriaInfo[] = [
    {
        name: 'Pending',
        id: 1,
        shortName: 'pending',
        // shortName: 'status:false',
    },
    {
        name: 'Done',
        id: 2,
        shortName: 'done',
        // shortName: 'status:true',
    },
    {
        name: 'All',
        id: 3,
        shortName: 'all',
        // shortName: 'status:',
    },
];

