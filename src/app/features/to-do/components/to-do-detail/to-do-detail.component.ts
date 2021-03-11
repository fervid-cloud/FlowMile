import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToDoTask } from '../../model/to-do-task';
import { ToDoManagementService } from '../../service/to-do-management/to-do-management.service';

@Component({
    selector: 'app-to-do-detail',
    templateUrl: './to-do-detail.component.html',
    styleUrls: ['./to-do-detail.component.css']
})
export class ToDoDetailComponent implements OnInit {

    currentToDoTask: ToDoTask | null | undefined = undefined;

    private activatedRouteSubscription!: Subscription;

    private history: string[] = []
    private routerEventSubscription: Subscription;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location,
        private taskManagementService: ToDoManagementService
    ) {

        //our choice where we want to subscribe if the observable/subject we are subscribing to exist at
        // the time of subscribing

        this.routerEventSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.history.push(event.urlAfterRedirects)
            }
        });
    }

    ngOnInit(): void {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe((updatedParams: Params) => {
            const providedTaskId = updatedParams['taskId'];
            console.log("Provided taskId is : ", providedTaskId);
            this.currentToDoTask = this.taskManagementService.findByTaskId(providedTaskId);
        });
    }

    ngOnDestroy() {
        this.activatedRouteSubscription.unsubscribe();
        this.routerEventSubscription.unsubscribe();
    }

    onTaskEdit() {
        // as by default this is from root so we have to mention full path here
        this.router.navigate(["dashboard", "todo", "edit", this.currentToDoTask?.getTodoId()]);
    }


    goBack() {
        this.back();
    }

    private back(): void {
        console.debug("The history is : ", this.history);
        if (this.history.length > 0) {
            this.location.back()
        } else {
            // in case we opened the browser directly with this link, or new tab with this link, then try to go back
            console.debug("going back through backup as no history is there-----------------");
            this.router.navigateByUrl('/')
        }
    }
}
