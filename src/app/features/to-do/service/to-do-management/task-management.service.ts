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
import { CreateCategoryDto } from '../../dto/create-category-dto';
import { CreateTaskDto } from '../../dto/create-task';
import { EditTaskDto } from '../../dto/edit-task-dto';
import { EditCategoryDto } from '../../dto/edit-category-dto';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class TaskManagementService {

    private taskCategoriesInfo: PaginationWrapperDto = new PaginationWrapperDto();
    private tasksInfo: PaginationWrapperDto = new PaginationWrapperDto();

    taskCategoryId = 0;

    private lastCategoriesListPageNumber: number = 1;

    private lastVisitedCategoryListRoute: string = "";

    typeCriteriaInfoList: CriteriaInfo [] = typeCriteriaInfoList;

    sortCriteriaInfoList: CriteriaInfo[] = sortCriteriaInfoList;

    constructor(
        private httpClient: HttpClient,
        private backendRestApiService: BackendRestApiService,
        private toastrService: ToastrService
    ) {
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
        return this.taskCategoriesInfo;
    }


    async getCategoryDetail(categoryId: number): Promise<TaskCategory> {
        const result = this.taskCategoriesInfo.results.filter(category => category.id = categoryId);
        if(result.length > 0) {
            return result[0];
        }
        const categoryDetailResponse: ResponseModel = await this.backendRestApiService.getCategoryDetail(categoryId);
        return categoryDetailResponse.data;
    }


    async getTaskDetail(taskId: number): Promise<Task> {
        const result = this.tasksInfo.results.filter(task => task.id = taskId);
        if(result.length > 0) {
            return result[0];
        }
        const taskDetailResponse: ResponseModel = await this.backendRestApiService.getTaskDetail(taskId);
        return taskDetailResponse.data;
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
        this.tasksInfo = response.data;
        return this.tasksInfo;
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
        this.taskCategoriesInfo = response.data;
        return this.taskCategoriesInfo;
    }

    private convertToQueryParams(queryData: ListFilterSortPaginationWrapperDto) {
        let queryParams = new HttpParams();
        Object.entries(queryData).forEach((entry) => {
            // The HttpParams is immutable as you can see here
            queryParams = queryParams.append(entry[0], entry[1]);
        });
        return queryParams;
    }

    async createNewCategory(createCategoryDto: CreateCategoryDto): Promise<boolean> {
        try {
            const result = await this.httpClient.request(RequestMethod.POST, environment.backendSocket + '/api/task_manage/category/create', {
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                responseType: 'json',
                body: JSON.stringify(createCategoryDto)
            }).toPromise();
            console.log(result);
            this.toastrService.success("Category created successfully", "Created", {
                timeOut: 2000,
                positionClass: 'toast-bottom-right',
            });
            return true;
        } catch(ex) {
            this.toastrService.error("Some error occurred", "Error", {
                timeOut: 2000,
                positionClass: 'toast-bottom-right',
            });
            return false;
        }
    }


    async editCategoryInfo(editCategoryDto: EditCategoryDto): Promise<boolean> {
        try {
            const result = await this.httpClient.request(RequestMethod.PUT, environment.backendSocket + '/api/task_manage/category/edit', {
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                responseType: 'json',
                body: JSON.stringify(editCategoryDto)
            }).toPromise() as ResponseModel;
            const updatedCategory = result.data;
            if(this.taskCategoriesInfo.results.length == 0) {
                this.taskCategoriesInfo.results.push(updatedCategory);
            } else {
                for(let i = 0; i < this.taskCategoriesInfo.results.length; ++i) {
                    if(this.taskCategoriesInfo.results[i].id == updatedCategory.id) {
                        this.taskCategoriesInfo.results[i] = updatedCategory;
                        break;
                    }
                }
            }
            console.log(result);
            this.toastrService.success("Category updated successfully", "Created", {
                timeOut: 2000,
                positionClass: 'toast-bottom-right',
            });
            return true;
        } catch(ex) {
            this.toastrService.error("Some error occurred", "Error", {
                timeOut: 2000,
                positionClass: 'toast-bottom-right',
            });
            return false;
        }
    }

    async deleteCategory(currentCategory: TaskCategory): Promise<boolean> {
        try {
            const result = await this.httpClient.request(RequestMethod.DELETE, environment.backendSocket + `/api/task_manage/category/delete/${currentCategory.id}`, {
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                responseType: 'json',
            }).toPromise() as ResponseModel;
            const updatedCategory = result.data;
            this.taskCategoriesInfo.results = this.taskCategoriesInfo.results.filter(category => category.id != currentCategory.id);
            console.log(result);
            this.toastrService.success("Category Deleted successfully", "Deleted", {
                timeOut: 2000,
                positionClass: 'toast-bottom-right',
            });
            return true;
        } catch(ex) {
            this.toastrService.error("Some error occurred", "Error", {
                timeOut: 2000,
                positionClass: 'toast-bottom-right',
            });
            return false;
        }
    }

    async createTask(createTaskDto: CreateTaskDto) {
        try {
            const result = await this.httpClient.request(RequestMethod.POST, environment.backendSocket + '/api/task_manage/task/create', {
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                responseType: 'json',
                body: JSON.stringify(createTaskDto)
            }).toPromise();
            console.log(result);
            this.toastrService.success("Task created successfully", "Created", {
                timeOut: 2000,
                positionClass: 'toast-bottom-right',
            });

            return true;
        } catch(ex) {
            this.toastrService.error("Some error occurred", "Error", {
                timeOut: 2000,
                positionClass: 'toast-bottom-right',
            });
            return false;
        }
    }

    async editTaskInfo(editTaskDto: EditTaskDto) {
        try {
            const result = await this.httpClient.request(RequestMethod.PUT, environment.backendSocket + '/api/task_manage/task/edit', {
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                responseType: 'json',
                body: JSON.stringify(editTaskDto)
            }).toPromise() as ResponseModel;
            console.log(result);
            const updatedTask = result.data;
            if(this.tasksInfo.results.length == 0) {
                console.log("pushing in the data");
                this.taskCategoriesInfo.results.push(updatedTask);
                console.log(this.taskCategoriesInfo);
            } else {
                console.log("the updated task is");
                for(let i = 0; i < this.tasksInfo.results.length; ++i) {
                    if(this.tasksInfo.results[i].id == updatedTask.id) {
                        this.tasksInfo.results[i] = updatedTask;
                        break;
                    }
                }
            }
            console.log("updated tasks :", this.tasksInfo);
            this.toastrService.success("Task updated successfully", "Success", {
                timeOut: 2000,
                positionClass: 'toast-bottom-right',
            });
            return true;
        } catch(ex) {
            this.toastrService.error("Some error occurred", "Error", {
                timeOut: 2000,
                positionClass: 'toast-bottom-right',
            });
            return false;
        }
    }


    async deleteTask(currentTask: Task) {
        try {
            const result = await this.httpClient.request(RequestMethod.DELETE, environment.backendSocket + `/api/task_manage/task/delete/${currentTask.id}`, {
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                responseType: 'json'
            }).toPromise() as ResponseModel;
            console.log(result);
            this.tasksInfo.results = this.taskCategoriesInfo.results.filter(task => task.id != currentTask.id);
            this.toastrService.success("Task deleted successfully", "Success", {
                timeOut: 2000,
                positionClass: 'toast-bottom-right',
            });
            return true;
        } catch(ex) {
            this.toastrService.error("Some error occurred", "Error", {
                timeOut: 2000,
                positionClass: 'toast-bottom-right',
            });
            return false;
        }
    }

}
