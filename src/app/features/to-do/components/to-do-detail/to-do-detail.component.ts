import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToDoTask } from '../../model/to-do-task';
import { ToDoManagementService } from '../../service/to-do-management/to-do-management.service';
import Modal from 'bootstrap/js/dist/modal';
import { UtilService } from 'src/app/shared/utility/util-service/util.service';

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

    // NgModel is used for inputs and is used within forms whereas a ViewChild can be used to point to a component / directive you have on your page.

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
    deleteConfirmationDialogModal!: Modal;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location,
        private taskManagementService: ToDoManagementService,
        private utilService: UtilService
    ) {

        //our choice where we want to subscribe if the observable/subject we are subscribing to exist at
        // the time of subscribing

        const observer = {
            next: (routerEvent: any) => {
                if (routerEvent instanceof NavigationEnd) {
                    this.history.push(routerEvent.urlAfterRedirects)
                }
            },
            error: (routerError: any) => {
                console.log("error event sent by router");
            },
            Complete: (completeEvent: any) => {
                console.log("completed");
            }
        }

        this.routerEventSubscription = this.router.events.subscribe(observer);
    }

    ngOnInit(): void {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe((updatedParams: Params) => {
            const allParams: Params = this.utilService.getAllRouteParams1(this.activatedRoute);
            console.log("all params are :", allParams);
            const categoryId = allParams['categoryId'];
            const providedTaskId = allParams['taskId'];

            console.log("Provided taskId is : ", providedTaskId);
            this.currentToDoTask = this.taskManagementService.findByTaskId(categoryId, providedTaskId);
        });

    }



    ngAfterViewInit() {
        //was put here as not this life cycle hook runs when all the dom element are made(except external api call eg. http);
        const myModalEl = <HTMLElement>document.getElementById('myModal');
        console.log(myModalEl);
        console.log("myModelEl is : ", myModalEl);
        this.deleteConfirmationDialogModal = new Modal(myModalEl, {
            backdrop: 'static',
            keyboard: false,
            focus: true
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


    onTaskDelete() {
        this.deleteConfirmationDialogModal.show();
    }

    confirmTaskDeletion() {
        if (this.currentToDoTask) {
            this.taskManagementService.deleteTaskById(this.currentToDoTask.getTaskCategoryId(), this.currentToDoTask.getTodoId());
            this.currentToDoTask = undefined;
        }
        this.deleteConfirmationDialogModal.hide();
    }

    removeModal() {
        this.deleteConfirmationDialogModal.hide();
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
