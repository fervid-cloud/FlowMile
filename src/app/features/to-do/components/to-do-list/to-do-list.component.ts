import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/shared/utility/util-service/util.service';
import { ToDoTask } from '../../model/to-do-task';
import { ToDoManagementService } from '../../service/to-do-management/to-do-management.service';

@Component({
    selector: 'app-to-do-list',
    templateUrl: './to-do-list.component.html',
    styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

    taskCategoryId: number = 0;

    toDoTasks: ToDoTask[] = [];

    listType: string = "all";

    //subscriptions
    private toDoTaskSubscription!: Subscription;
    private activatedRouteSubscription!: Subscription;

    constructor(
        private todoManagementService: ToDoManagementService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private utilService: UtilService
    ) {

    }


    ngOnInit(): void {
        console.log("reached ngOnInit of list component here");
        this.initializeSubscriptions();
    }


    private initializeSubscriptions() {
        this.subscribeToActivatedRoute();
        this.subscribeToTaskManagement();
    }


    subscribeToActivatedRoute() {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe((updatedParams: Params) => {
            console.log("The activated routes params is : ", updatedParams);
            const allParams: Params = this.utilService.getAllRouteParams1(this.activatedRoute);
            console.log("all params are : ", allParams);
            this.taskCategoryId = allParams['categoryId'];
            const value = allParams['listType'];
            if (value == "done" || value == "pending") {
                this.listType = value;
                console.log("activated route params is : ", updatedParams);
                console.log("value is : ", value);
                return;
            }
            this.listType = "all";


        });
    }


    private subscribeToTaskManagement() {
        this.toDoTaskSubscription = this.todoManagementService.categoryTaskMapping$.subscribe((updatedCategoryMapping) => {
            this.toDoTasks = updatedCategoryMapping[this.taskCategoryId];
            console.log("The tasks are : ", this.toDoTasks);
        });
    }


    ngOnDestroy(): void {
        this.clearSubscriptions();
    }


    private clearSubscriptions() {
        this.toDoTaskSubscription.unsubscribe();
        this.activatedRouteSubscription.unsubscribe();
    }


    getAllTodo(): ToDoTask[] {
        return this.toDoTasks;
    }


    getPendingTask(): ToDoTask[] {
        return this.toDoTasks.filter((task) => task.getTaskStatus() == false);
    }


    getDoneTask(): ToDoTask[] {
        return this.toDoTasks.filter((task) => task.getTaskStatus() == true);
    }


    onChoosingViewDetail(taskId : number) {
        this.router.navigate([taskId], {
            relativeTo: this.activatedRoute
        });
    }

}
