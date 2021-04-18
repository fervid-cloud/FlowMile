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
    styleUrls: [ './to-do-list.component.css' ]
})
export class ToDoListComponent implements OnInit, OnDestroy {

    taskCategoryId = 0;
    currentActiveTasksInfo: PaginationWrapperDto = new PaginationWrapperDto();

    currentActiveSubscription!: Subscription;

    listType = 'all';

    currentPageNumber: number = 1;

    showSpinner = false;

    // subscriptions
    private paramUpdateTime: Date = new Date(1980);
    private queryParamUpdateTime: Date = new Date(1980);
    private activatedParamRouteSubscription!: Subscription;
    private activatedQueryParamRouteSubscription!: Subscription;


    constructor(
        private taskManagementService: TaskManagementService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {

    }


    ngOnInit(): void {
        console.log('reached ngOnInit of list component here');
        this.initializeSubscriptions();
    }


    private initializeSubscriptions(): void {
        this.subscribeToActivatedRoute();

    }


    subscribeToActivatedRoute(): void {

        this.activatedParamRouteSubscription = this.activatedRoute.params.subscribe(async (updatedParams: Params) => {
            const allParams: Params = UtilService.getAllRouteParams1(this.activatedRoute);
            this.taskCategoryId = allParams.categoryId;
            const value = allParams.listType;

            if (!UtilService.isValidNumber(this.taskCategoryId)) {
                this.router.navigate(["/dashboard"]);
                return;
            }
            const pageNumber = this.activatedRoute.snapshot.root.queryParamMap.get('page');
            this.currentPageNumber = UtilService.getUpdatedPageNumber(pageNumber);

            this.paramUpdateTime = new Date();
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%route params fired, page number is : ', this.currentPageNumber);
            if (Math.abs(Number(Date.now() - this.queryParamUpdateTime.getTime() <= 500))) {
                return;
            }
            console.log('calling task service in params subscribe--------------');
            await this.showLoading( () => {
                return this.handleTaskType();
            });

        });

        this.activatedQueryParamRouteSubscription = this.activatedRoute.queryParams.subscribe(async (updatedQueryParams: Params) => {

            const pageNumber = updatedQueryParams.page;
            this.currentPageNumber = UtilService.getUpdatedPageNumber(pageNumber);
            if (Math.abs(Number(Date.now() - this.paramUpdateTime.getTime() <= 500))) {
                return;
            }
            this.queryParamUpdateTime = new Date();
            console.log('calling task service in queryParams subscribe--------------');
            await this.showLoading( () => {
                return this.handleTaskType();
            });

        });
    }


    async handleTaskType(): Promise<Promise<void> | void> {
        await new Promise(resolve => setTimeout(() => resolve(true), 3000));

        switch (this.listType) {
            case 'done':
                return this.updateSubscriptionToAllDoneTaskInfo(this.currentPageNumber);
            case 'pending':
                return this.updateSubscriptionToAllPendingTaskInfo(this.currentPageNumber);
            case 'all':
                return this.updateSubscriptionToAllAnyTaskInfo(this.currentPageNumber);
            default:
                this.invalidRouteDetected();

        }
    }

    invalidRouteDetected(): Promise<boolean> {
        return this.router.navigate([ '../..' ], {
            relativeTo: this.activatedRoute
        });
    }

    ngOnDestroy(): void {
        this.clearSubscriptions();
    }


    private clearSubscriptions(): void {
        this.currentActiveSubscription?.unsubscribe();
        this.activatedParamRouteSubscription?.unsubscribe();
        this.activatedQueryParamRouteSubscription?.unsubscribe();
    }


    private async updateSubscriptionToAllDoneTaskInfo(currentPageNumber: number): Promise<void> {
/*        this.currentActiveSubscription?.unsubscribe();
        this.currentActiveSubscription = this.taskManagementService.allDoneStatusTaskInfo$.subscribe(paginationWrapperInfo => {
            this.currentActiveTasksInfo = paginationWrapperInfo;
        });*/

        this.currentActiveTasksInfo = await this.taskManagementService.getAllDoneStatusTasks(this.taskCategoryId, currentPageNumber);

    }


    private async updateSubscriptionToAllPendingTaskInfo(currentPageNumber: number): Promise<void> {
     /*   this.currentActiveSubscription?.unsubscribe();
        this.currentActiveSubscription = this.taskManagementService.allPendingStatusTaskInfo$.subscribe(paginationWrapperInfo => {
            this.currentActiveTasksInfo = paginationWrapperInfo;
        });*/

        this.currentActiveTasksInfo = await this.taskManagementService.getAllPendingStatusTasks(this.taskCategoryId, currentPageNumber);

    }

    private async updateSubscriptionToAllAnyTaskInfo(currentPageNumber: number): Promise<void> {
   /*     this.currentActiveSubscription?.unsubscribe();
        this.currentActiveSubscription = this.taskManagementService.allAnyStatusTasksInfo$.subscribe(paginationWrapperInfo => {
            this.currentActiveTasksInfo = paginationWrapperInfo;
        });*/
        this.currentActiveTasksInfo = await this.taskManagementService.getAllAnyStatusTasks(this.taskCategoryId, currentPageNumber);

    }

    async showLoading(callback: () => void): Promise<void> {
        try {
            this.showSpinner = true;
            await callback();
        } finally {
            this.showSpinner = false;
        }

    }

}
