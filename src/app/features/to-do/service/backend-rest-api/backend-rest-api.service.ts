import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCategoryDto } from 'src/app/features/to-do/dto/create-category-dto';
import { CreateTaskDto } from 'src/app/features/to-do/dto/create-task';
import { NewToDoTask } from 'src/app/features/to-do/model/new-to-do-task';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../../../../shared/utility/response-model/response-model';
import { Observable } from 'rxjs';
import { RequestMethod } from '../../../../auth/enum/request-method-enum';

@Injectable({
  providedIn: 'root'
})
export class BackendRestApiService {

    constructor(private httpClient: HttpClient) { }

    backendUrl = environment.backendSocket;

/*    request(method: string, url: string, options?: {
      body?: any;
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      observe?: HttpObserve;
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }): Observable<any>;*/

    getAllAnyStatusTasks(categoryId: number, pageNumber: number = 1, pageSize: number = 12): Promise<ResponseModel> {
        const currentBackendUrl = this.backendUrl + `/api/task_manage/task/all/${categoryId}?pageNumber=${ pageNumber }&pageSize=${ pageSize }`;
        return this.httpClient.request(RequestMethod.GET, currentBackendUrl, {
          headers: {
            'Content-Type': 'application/json'
          },
          reportProgress: true,
          responseType: 'json' // by default
        }).toPromise() as Promise<ResponseModel>;
    }


    getAllPendingStatusTasks(categoryId: number, pageNumber: number = 1, pageSize: number = 12): Promise<ResponseModel>{
        const currentBackendUrl = this.backendUrl + `/api/task_manage/task/all/${categoryId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return this.httpClient.request(RequestMethod.GET, currentBackendUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            reportProgress: true,
            responseType: 'json' // by default
        }).toPromise() as Promise<ResponseModel>;
    }

    getAllDoneStatusTasks(categoryId: number, pageNumber: number = 1, pageSize: number = 12): Promise<ResponseModel>{
        const currentBackendUrl = this.backendUrl + `/api/task_manage/task/all/${categoryId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return this.httpClient.request(RequestMethod.GET, currentBackendUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            reportProgress: true,
            responseType: 'json' // by default
        }).toPromise() as Promise<ResponseModel>;
    }

    getAllCategory(pageNumber: number = 1, pageSize: number = 12): Promise<ResponseModel> {
        const currentBackendUrl = this.backendUrl + `/api/task_manage/category/all?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return this.httpClient.request(RequestMethod.GET, currentBackendUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            reportProgress: true,
            responseType: 'json' // by default
        }).toPromise() as Promise<ResponseModel>;
    }


    getCategoryDetail(categoryId: number): Promise<ResponseModel> {
        const currentBackendUrl = this.backendUrl + `/api/task_manage/category/detail/${categoryId}`;
        return this.httpClient.request(RequestMethod.GET, currentBackendUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            reportProgress: true,
            responseType: 'json' // by default
        }).toPromise() as Promise<ResponseModel>;
    }

    getTaskDetail(taskId: number): Promise<ResponseModel> {
        const currentBackendUrl = this.backendUrl + `/api/task_manage/task/detail/${taskId}`;
        return this.httpClient.request(RequestMethod.GET, currentBackendUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            reportProgress: true,
            responseType: 'json' // by default
        }).toPromise() as Promise<ResponseModel>;
    }



    createCategory(newCreateCategory: CreateCategoryDto): Promise<ResponseModel> {
        const currentBackendUrl = this.backendUrl + `/api/task_manage/category/create`;
        return this.httpClient.request(RequestMethod.POST, currentBackendUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            reportProgress: true,
            body: JSON.stringify(newCreateCategory),
            responseType: 'json' // by default
        }).toPromise() as Promise<ResponseModel>;
    }


    createTask(newCreateTask: CreateTaskDto): Promise<ResponseModel> {
        const currentBackendUrl = this.backendUrl + `/api/task_manage/task/create`;
        return this.httpClient.request(RequestMethod.POST, currentBackendUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            reportProgress: true,
            body: JSON.stringify(newCreateTask),
            responseType: 'json' // by default
        }).toPromise() as Promise<ResponseModel>;
    }



    deleteCategory(categoryId: number): Promise<any> {
        const currentBackendUrl = this.backendUrl + `/api/task_manage/category/delete/${categoryId}`;
        return this.httpClient.request(RequestMethod.DELETE, currentBackendUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            reportProgress: true,
            responseType: 'json' // by default
        }).toPromise() as Promise<any>;
    }


    deleteTask(taskId: number): Promise<any> {
        const currentBackendUrl = this.backendUrl + `/api/task_manage/task/delete/${taskId}`;
        return this.httpClient.request(RequestMethod.DELETE, currentBackendUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            reportProgress: true,
            responseType: 'json' // by default
        }).toPromise() as Promise<any>;
    }


}
