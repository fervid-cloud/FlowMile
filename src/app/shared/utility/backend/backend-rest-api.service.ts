import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCategoryDto } from 'src/app/features/dto/create-category-dto';
import { CreateTaskDto } from 'src/app/features/dto/create-task';
import { NewToDoTask } from 'src/app/features/to-do/model/new-to-do-task';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../response-model/response-model';

@Injectable({
  providedIn: 'root'
})
export class BackendRestApiService {

    constructor() { }

    backendUrl = environment.backendSocket;

    async responseCheck(response: Response) {
        const responseObject = <ResponseModel>(await response.json());

        if (!response.ok) {
            throw new Error(responseObject.message);
        }
        return responseObject;
    }


    getAllAnyStatusTasks(categoryId: number, pageNumber: number = 1, pageSize: number = 20) {
        return fetch(this.backendUrl + `/api/task_manage/task/all/${categoryId}?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(this.responseCheck);
    }

    getAllPendingStatusTasks(categoryId: number, pageNumber: number = 1, pageSize: number = 20) {
        return fetch(this.backendUrl + `/api/task_manage/task/all/${categoryId}?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(this.responseCheck);
    }

    getAllDoneStatusTasks(categoryId: number, pageNumber: number = 1, pageSize: number = 20) {
        return fetch(this.backendUrl + `/api/task_manage/task/all/${categoryId}?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(this.responseCheck);
    }


    getAllCategory(pageNumber: number = 1, pageSize: number = 20): Promise<ResponseModel> {

        return fetch(this.backendUrl + `/api/task_manage/category/all?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            method: 'GET',
            cache: 'no-cache'
        }).then(this.responseCheck);
    }


    getTaskDetail(taskId: number) {
        return fetch(this.backendUrl + `/api/task_manage/task/detail/${taskId}`).then(this.responseCheck);
    }

    getCategoryDetail(categoryId: number) {
        return fetch(this.backendUrl + `/api/task_manage/category/detail/${categoryId}`).then(this.responseCheck);
    }


    createCategory(newCreateCategory: CreateCategoryDto) {
        return fetch(this.backendUrl + `/api/task_manage/category/create`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(newCreateCategory)
        }).then(this.responseCheck);
    }

    createTask(newCreateTask: CreateTaskDto) {
        return fetch(this.backendUrl + `/api/task_manage/task/create`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(newCreateTask)
        }).then(this.responseCheck);
    }



    deleteCategory(categoryId: number) {
        return fetch(this.backendUrl + `/api/task_manage/category/delete/${categoryId}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        }).then(this.responseCheck);
    }


    deleteTask(taskId: number) {
        return fetch(this.backendUrl + `/api/task_manage/task/delete/${taskId}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        }).then(this.responseCheck);
    }

}
