import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BackendRestApiService } from 'src/app/features/to-do/service/backend-rest-api/backend-rest-api.service';
import { ResponseModel } from 'src/app/shared/utility/response-model/response-model';
import { TaskType } from '../../enum/TaskType';
import { PaginationWrapperDto } from '../../model/pagination-wrapper-dto';
import { TaskCategory } from '../../model/task-category';
import { Task } from '../../model/task';

@Injectable({
    providedIn: 'root'
})
export class TaskManagementService {

    private taskCategoriesInfo: PaginationWrapperDto = new PaginationWrapperDto();
    private allAnyStatusTasksInfo: PaginationWrapperDto = new PaginationWrapperDto();
    private allPendingStatusTaskInfo: PaginationWrapperDto = new PaginationWrapperDto();
    private allDoneStatusTaskInfo: PaginationWrapperDto = new PaginationWrapperDto();


    private _taskCategoriesInfo: BehaviorSubject<PaginationWrapperDto> = new BehaviorSubject<PaginationWrapperDto>(this.taskCategoriesInfo);
    private _allAnyStatusTasksInfo: BehaviorSubject<PaginationWrapperDto> = new BehaviorSubject<PaginationWrapperDto>(this.allAnyStatusTasksInfo);
    private _allPendingStatusTaskInfo: BehaviorSubject<PaginationWrapperDto> = new BehaviorSubject<PaginationWrapperDto>(this.allPendingStatusTaskInfo);
    private _allDoneStatusTaskInfo: BehaviorSubject<PaginationWrapperDto> = new BehaviorSubject<PaginationWrapperDto>(this.allDoneStatusTaskInfo);


    public taskCategoriesInfo$: Observable<PaginationWrapperDto>;
    public allAnyStatusTasksInfo$: Observable<PaginationWrapperDto>;
    public allPendingStatusTaskInfo$: Observable<PaginationWrapperDto>;
    public allDoneStatusTaskInfo$: Observable<PaginationWrapperDto>;

    constructor(private backendRestApiService: BackendRestApiService) {
        this.taskCategoriesInfo$ = this._taskCategoriesInfo.asObservable();
        this.allAnyStatusTasksInfo$ = this._allAnyStatusTasksInfo.asObservable();
        this.allPendingStatusTaskInfo$ = this._allPendingStatusTaskInfo.asObservable();
        this.allDoneStatusTaskInfo$ = this._allDoneStatusTaskInfo.asObservable();
        this.initializeTasks();
    }

    initializeTasks(): void{

        // this.fetchAndUpdateCategories();
        // this.fetchAndUpdateAnyStatusTasks();
        // this.fetchAndUpdatePendingStatusTasks(TaskType.DONE);
        // this.fetchAndUpdateDoneStatusTasks(TaskType.PENDING);

    }


    async getAllTasksCategories(): Promise<void> {
        this.taskCategoriesInfo = ((await this.backendRestApiService.getAllCategory(1, 25)).data as PaginationWrapperDto);
        this._taskCategoriesInfo.next(this.taskCategoriesInfo);
    }


    async getAllAnyStatusTasks(categoryId: number): Promise<void> {
        this.allAnyStatusTasksInfo = ((await this.backendRestApiService.getAllAnyStatusTasks(categoryId)).data as PaginationWrapperDto);
        this._allAnyStatusTasksInfo.next(this.allAnyStatusTasksInfo);
    }


    async getAllPendingStatusTasks(categoryId: number): Promise<void> {
        this.allPendingStatusTaskInfo = ((await this.backendRestApiService.getAllPendingStatusTasks(categoryId)).data as PaginationWrapperDto);
        this._allPendingStatusTaskInfo.next(this.allPendingStatusTaskInfo);
    }


    async getAllDoneStatusTasks(categoryId: number): Promise<void> {
        this.allDoneStatusTaskInfo = ((await this.backendRestApiService.getAllDoneStatusTasks(categoryId)).data as PaginationWrapperDto);
        this._allDoneStatusTaskInfo.next(this.allDoneStatusTaskInfo);
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

    requestMockUp() : Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 2000);
        });
    }


}
