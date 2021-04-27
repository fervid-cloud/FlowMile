import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BackendRestApiService } from 'src/app/features/to-do/service/backend-rest-api/backend-rest-api.service';
import { ResponseModel } from 'src/app/shared/utility/response-model/response-model';
import { TaskType } from '../../enum/TaskType';
import { PaginationWrapperDto } from '../../model/pagination-wrapper-dto';
import { TaskCategory } from '../../model/task-category';
import { Task } from '../../model/task';
import { UtilService } from '../../../../shared/utility/util-service/util.service';
import { ListFilterSortPaginationWrapperDto } from '../../dto/list-filter-wrapper-dto';
import { CriteriaInfo, sortCriteriaInfoList, typeCriteriaInfoList } from '../../model/list-filterWrapper';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestMethod } from '../../../../auth/enum/request-method-enum';

@Injectable({
    providedIn: 'root'
})
export class TaskManagementService {

    private taskCategoriesInfo: PaginationWrapperDto = new PaginationWrapperDto();
    private allAnyStatusTasksInfo: PaginationWrapperDto = new PaginationWrapperDto();

    taskCategoryId = 0;



    private _taskCategoriesInfo: BehaviorSubject<PaginationWrapperDto> = new BehaviorSubject<PaginationWrapperDto>(this.taskCategoriesInfo);
    private _allAnyStatusTasksInfo: BehaviorSubject<PaginationWrapperDto> = new BehaviorSubject<PaginationWrapperDto>(this.allAnyStatusTasksInfo);

    public taskCategoriesInfo$: Observable<PaginationWrapperDto>;
    public allAnyStatusTasksInfo$: Observable<PaginationWrapperDto>;

    private lastCategoriesListPageNumber: number = 1;

    private lastVisitedCategoryListRoute: string = "";

    typeCriteriaInfoList: CriteriaInfo [] = typeCriteriaInfoList;

    sortCriteriaInfoList: CriteriaInfo[] = sortCriteriaInfoList;

    constructor(
        private httpClient: HttpClient,
        private backendRestApiService: BackendRestApiService
    ) {
        this.taskCategoriesInfo$ = this._taskCategoriesInfo.asObservable();
        this.allAnyStatusTasksInfo$ = this._allAnyStatusTasksInfo.asObservable();
        this.initializeTasks();
    }


    setLastCategoriesListPageNumber(currentPageNumber: number): void {
        this.lastCategoriesListPageNumber = currentPageNumber;
    }


    getLastCategoriesListPageNumber(): number {
        return this.lastCategoriesListPageNumber;
    }

    initializeTasks(): void{
    }


    async getAllTasksCategories(pageNumber: number = 1): Promise<PaginationWrapperDto> {
        // basically 12 has been choose because the no. of column specified for different size screen are
        // divisors of it, so they will fit fully in the screen(there can be exception in the situation where the page is the last one)
        // thus making the illusion of all items in the page, and no unnecessary possible spaces where it could be have been filled
        this.taskCategoriesInfo = ((await this.backendRestApiService.getAllCategory(pageNumber, 12)).data as PaginationWrapperDto);
        this._taskCategoriesInfo.next(this.taskCategoriesInfo);
        return this.taskCategoriesInfo;
    }


    async getCategoryDetail(categoryId: number): Promise<TaskCategory> {
        const categoryDetailResponse: ResponseModel = await this.backendRestApiService.getCategoryDetail(categoryId);
        return categoryDetailResponse.data;
    }


    async getTaskDetail(taskId: number): Promise<Task> {
        const taskDetailResponse: ResponseModel = await this.backendRestApiService.getTaskDetail(taskId);
        return taskDetailResponse.data;
    }


    async createNewCategory(taskCategory: TaskCategory): Promise<void> {
        console.log('added');
    }

    requestMockUp(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 2000);
        });
    }

    validateTypeCriteria(criteriaShortName: string | undefined | null): CriteriaInfo {
        const chosenCriteria: CriteriaInfo [] = this.typeCriteriaInfoList.filter(criteria => criteria.shortName == criteriaShortName);
        if (chosenCriteria.length == 0) {
            return this.typeCriteriaInfoList[0];
        }
        return chosenCriteria[0];
    }


    validateSortCriteria(criteriaShortName: string | undefined | null): CriteriaInfo {
        const chosenCriteria: CriteriaInfo [] = this.sortCriteriaInfoList.filter(criteria => criteria.shortName == criteriaShortName);
        if (chosenCriteria.length == 0) {
            return this.sortCriteriaInfoList[0];
        }
        return chosenCriteria[0];
    }

    public validatePageCriteria(selectedPageNumber: number | undefined | null): number {
        return UtilService.getUpdatedPageNumber(selectedPageNumber);
    }


    private getDefaultQueryParamValues(queryParamKey: any, queryParamValue: any): any {
        switch (queryParamKey) {
            case 'type':
                return this.validateTypeCriteria(queryParamValue).shortName;
            case 'sort':
                return this.validateSortCriteria(queryParamValue).shortName;
            case 'page':
                return this.validatePageCriteria(queryParamValue);

        }
        return queryParamValue;
    }

    copyAndUpdateToAllowedAndDefaultValues(queryData: ListFilterSortPaginationWrapperDto, validatedObject: any): void {

        Object.keys(queryData).forEach(key => {
            if (key in validatedObject) {
                // @ts-ignore
                queryData[key] = validatedObject[key];
            }
            // @ts-ignore
            queryData[key] = this.getDefaultQueryParamValues(key, queryData[key]);
        });
    }

    InitializeTaskListFilterSortPaginationWrapperDto(): ListFilterSortPaginationWrapperDto {
        return {
            type: "",
            name: "",
            sort: "",
            page: 1,
            pageSize: 12
        };
    }

    InitializeCategoryListFilterSortPaginationWrapperDto(): ListFilterSortPaginationWrapperDto {
        return {
            name: "",
            sort: "",
            page: 1,
            pageSize: 12
        };
    }

    async fetchFilteredTasks(queryData: ListFilterSortPaginationWrapperDto): Promise<PaginationWrapperDto> {
        const queryParams = this.convertToQueryParams(queryData);
        const currentBackendUrl = BackendRestApiService.BACKEND_URL + `/api/task_manage/task/all/${ this.taskCategoryId }`;
        const response = (await this.httpClient.request(RequestMethod.GET, currentBackendUrl, {
            params: queryParams,
            headers: {
                'Content-Type': 'application/json'
            },
            reportProgress: true,
            responseType: 'json' // by default
        }).toPromise()) as ResponseModel;
        return response.data;
    }


    async fetchFilteredCategories(queryData: ListFilterSortPaginationWrapperDto): Promise<PaginationWrapperDto>{
        const queryParams = this.convertToQueryParams(queryData);
        const currentBackendUrl = BackendRestApiService.BACKEND_URL + `/api/task_manage/category/all`;
        const response = (await this.httpClient.request(RequestMethod.GET, currentBackendUrl, {
            params: queryParams,
            headers: {
                'Content-Type': 'application/json'
            },
            reportProgress: true,
            responseType: 'json' // by default
        }).toPromise()) as ResponseModel;
        return response.data;
    }

    private convertToQueryParams(queryData: ListFilterSortPaginationWrapperDto) {
        let queryParams = new HttpParams();
        Object.entries(queryData).forEach((entry) => {
            // The HttpParams is immutable as you can see here
            queryParams = queryParams.append(entry[0], entry[1]);
        });
        return queryParams;
    }
}
