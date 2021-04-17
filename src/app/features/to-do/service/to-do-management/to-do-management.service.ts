import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BackendRestApiService } from 'src/app/shared/utility/backend/backend-rest-api.service';
import { ResponseModel } from 'src/app/shared/utility/response-model/response-model';
import { TaskType } from '../../enum/TaskType';
import { PaginationWrapperDto } from '../../model/pagination-wrapper-dto';
import { TaskCategory } from '../../model/task-category';
import { ToDoTask } from '../../model/to-do-task';

@Injectable({
    providedIn: 'root'
})
export class ToDoManagementService {

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

    constructor(private backendRestApiService :BackendRestApiService) {
        this.taskCategoriesInfo$ = this._taskCategoriesInfo.asObservable();
        this.allAnyStatusTasksInfo$ = this._allAnyStatusTasksInfo.asObservable();
        this.allPendingStatusTaskInfo$ = this._allPendingStatusTaskInfo.asObservable();
        this.allDoneStatusTaskInfo$ = this._allDoneStatusTaskInfo.asObservable();
        this.initializeTasks();
    }

    initializeTasks() {

        // this.fetchAndUpdateCategories();
        // this.fetchAndUpdateAnyStatusTasks();
        // this.fetchAndUpdatePendingStatusTasks(TaskType.DONE);
        // this.fetchAndUpdateDoneStatusTasks(TaskType.PENDING);

    }


    async getAllTasksCategories() {
        this.taskCategoriesInfo = <PaginationWrapperDto>(await this.backendRestApiService.getAllCategory()).data;
        this._taskCategoriesInfo.next(this.taskCategoriesInfo);
    }


    async getAllAnyStatusTasks(categoryId: number) {
        this.allAnyStatusTasksInfo = <PaginationWrapperDto>(await this.backendRestApiService.getAllAnyStatusTasks(categoryId)).data;
        this._allAnyStatusTasksInfo.next(this.allAnyStatusTasksInfo);
    }


    async getAllPendingStatusTasks(categoryId: number) {
        this.allPendingStatusTaskInfo = <PaginationWrapperDto>(await this.backendRestApiService.getAllPendingStatusTasks(categoryId)).data;
        this._allPendingStatusTaskInfo.next(this.allPendingStatusTaskInfo);
    }


    async getAlleDoneStatusTasks(categoryId: number) {
        this.allDoneStatusTaskInfo = <PaginationWrapperDto>(await this.backendRestApiService.getAllDoneStatusTasks(categoryId)).data;
        this._allDoneStatusTaskInfo.next(this.allDoneStatusTaskInfo);
    }


    async getCategoryDetail(categoryId: number) {
        const categoryDetailResponse: ResponseModel = await this.backendRestApiService.getCategoryDetail(categoryId);
        return categoryDetailResponse.data;
    }


    async getTaskDetail(taskId: number) {
        const taskDetailResponse: ResponseModel = await this.backendRestApiService.getTaskDetail(taskId);
        return taskDetailResponse.data;
    }


    async createNewCategory(taskCategory: TaskCategory) {
        console.log("added");
    }

    requestMockUp() : Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 2000);
        });
    }


}
