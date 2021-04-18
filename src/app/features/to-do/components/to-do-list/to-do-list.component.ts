import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/shared/utility/util-service/util.service';
import { Task } from '../../model/task';
import { TaskManagementService } from '../../service/to-do-management/task-management.service';
import { PaginationWrapperDto } from '../../model/pagination-wrapper-dto';

@Component({
    selector: 'app-to-do-list',
    templateUrl: './to-do-list.component.html',
    styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit, OnDestroy {

    taskCategoryId = 0;

    toDoTasks: Task[] = [];

    currentActiveTasksInfo!: PaginationWrapperDto;

    currentActiveSubscription!: Subscription;

    listType = 'all';

    showSpinner = false;

    // subscriptions
    private toDoTaskSubscription!: Subscription;
    private activatedRouteSubscription!: Subscription;

    constructor(
        private taskManagementService: TaskManagementService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private utilService: UtilService
    ) {

    }


    ngOnInit(): void {
        console.log('reached ngOnInit of list component here');
        this.initializeSubscriptions();
    }


    private initializeSubscriptions(): void {
        this.subscribeToActivatedRoute();

    }


    subscribeToActivatedRoute(): void{
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe(async (updatedParams: Params) => {
            console.log('The activated routes params is : ', updatedParams);
            const allParams: Params = this.utilService.getAllRouteParams1(this.activatedRoute);
            console.log('all params are : ', allParams);

            this.taskCategoryId = allParams.categoryId;
            const value = allParams.listType;

            console.log('list type is : ', value);
            await this.handleTaskType(value);
        });
    }


    handleTaskType(taskType: string): Promise<void> | void{
        console.log(this.toDoTasks);
        switch (taskType) {

            case 'done':
                return this.updateSubscriptionToAllDoneTaskInfo();
            case 'pending':
                return this.updateSubscriptionToAllPendingTaskInfo();
            case 'all':
                return this.updateSubscriptionToAllAnyTaskInfo();
            default:
                this.invalidRouteDetected();

        }
    }

    invalidRouteDetected(): Promise<boolean> {
        return this.router.navigate(['../..'], {
            relativeTo: this.activatedRoute
        });
    }

/*
    private subscribeToTaskManagement() {
        this.toDoTaskSubscription = this.todoManagementService.categoryTaskMapping$.subscribe((updatedCategoryMapping) => {
            this.toDoTasks = updatedCategoryMapping[this.taskCategoryId];
            console.log("The tasks are : ", this.toDoTasks);
        });
    } */


    ngOnDestroy(): void {
        this.clearSubscriptions();
    }


    private clearSubscriptions(): void {
        this.currentActiveSubscription.unsubscribe();
        this.activatedRouteSubscription.unsubscribe();
    }




    private async updateSubscriptionToAllDoneTaskInfo(): Promise<void> {
        this.currentActiveSubscription?.unsubscribe();
        this.currentActiveSubscription = this.taskManagementService.allDoneStatusTaskInfo$.subscribe(paginationWrapperInfo => {
            this.currentActiveTasksInfo = paginationWrapperInfo;
        });
        try {
            this.showSpinner = true;
            await this.taskManagementService.getAllDoneStatusTasks(this.taskCategoryId);
        } finally {
            this.showSpinner = false;
        }
    }


    private async updateSubscriptionToAllPendingTaskInfo(): Promise<void>  {
        this.currentActiveSubscription?.unsubscribe();
        this.currentActiveSubscription = this.taskManagementService.allPendingStatusTaskInfo$.subscribe(paginationWrapperInfo => {
            this.currentActiveTasksInfo = paginationWrapperInfo;
        });
        try {
            this.showSpinner = true;
            await this.taskManagementService.getAllPendingStatusTasks(this.taskCategoryId);
        } finally {
            this.showSpinner = false;
        }
    }

    private async updateSubscriptionToAllAnyTaskInfo(): Promise<void>  {
        this.currentActiveSubscription?.unsubscribe();
        this.currentActiveSubscription = this.taskManagementService.allAnyStatusTasksInfo$.subscribe(paginationWrapperInfo => {
            this.currentActiveTasksInfo = paginationWrapperInfo;
        });
        try {
            this.showSpinner = true;
            await this.taskManagementService.getAllAnyStatusTasks(this.taskCategoryId);
        } finally {
            this.showSpinner = false;
        }
    }

}
