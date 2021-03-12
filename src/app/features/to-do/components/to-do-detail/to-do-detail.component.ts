import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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



    //for editing
    // for getting access to dom element, template,
    //note that we can edit the value of element here also but there are differences between ngModel and ViewChild

    // NgModel is used for inputs and is used within forms whereas a Viewchild can be used to point to a component / directive you have on your page.

    // NgModel will give you values for a given form field

    // ViewChild will allow you to access all public properties(values) and methods of the component you are pointing too.

    // we do so by defining a local reference of and element and using that name as argument in ViewChild decorator for access to
    // that element from this typescript code, we could have just stopped at defining the local reference only if we had
    // to operation till in template only
    // not that it wraps the dom element though to access the dom element we have to write like for eg.
    // taskDetail.nativeElement.value

    /* below way was too much manual work for this use case, so delegated the work to attribute directive in the template */
/*     @ViewChild('taskDetail') taskDetail!: ElementRef;

    @ViewChild('taskTitle') taskTitle!: ElementRef; */

    editMode: boolean = false;

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
        this.editMode = true;
        /* below way was too much manual work for this use case, so delegated the work to attribute directive in the template */
        // as by default this is from root so we have to mention full path here
        // this.router.navigate(["dashboard", "todo", "edit", this.currentToDoTask?.getTodoId()]);

       /*  console.log(this.taskDetail);
        console.log(this.taskDetail.nativeElement.textContent);
        this.taskDetail.nativeElement.contentEditable = true;
        // this.taskDetail.nativeElement.style.borderLeft = "1px solid blue";
        // this.taskDetail.nativeElement.style.borderRight = "1px solid blue";
        this.taskDetail.nativeElement.backgroundColor = ""
        // this.taskDetail.nativeElement.textContent = "";
        console.log(this.taskTitle);
        console.log(this.taskTitle.nativeElement.textContent);
        this.taskTitle.nativeElement.contentEditable = true;
        this.taskTitle.nativeElement.style.borderLeft = "1px solid blue";
        this.taskTitle.nativeElement.style.borderRight = "1px solid blue"; */
    }

    onUpdate() {
        this.editMode = false;
    }

    cancelEdit() {
        this.editMode = false;
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
