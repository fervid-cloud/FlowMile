import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToDoTask } from '../../model/to-do-task';
import { ToDoManagementService } from '../../service/to-do-management/to-do-management.service';

@Component({
    selector: 'app-to-do-list',
    templateUrl: './to-do-list.component.html',
    styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

    toDoTasks: ToDoTask[] = [];

    listType: string = "all";

    //subscriptions
    private toDoTaskSubscription!: Subscription;
    private activatedRouteSubscription!: Subscription;

    constructor(private todoManagementService: ToDoManagementService, private activatedRoute: ActivatedRoute) {

    }

    ngOnInit(): void {
        console.log("reached ngOnInit of list component here");
        this.initializeSubscriptions();

    }

    private initializeSubscriptions() {
        this.subscribeToTaskManagement();
        this.subscribeToActivatedRoute();
    }

    subscribeToActivatedRoute() {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe((updatedParams: Params) => {
            const value = updatedParams['listType'];
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
        this.toDoTaskSubscription = this.todoManagementService.toDoTasks$.subscribe((updatedTaskList) => {
            this.toDoTasks = updatedTaskList;
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

}
