import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToDoTask } from '../../model/to-do-task';
import { ToDoManagementService } from '../../service/to-do-management/to-do-management.service';
import Modal from 'bootstrap/js/dist/modal';
import { UtilService } from 'src/app/shared/utility/util-service/util.service';
import { GenericDialogModelComponent } from 'src/app/shared/utility/components/generic-dialog-model/generic-dialog-model.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-to-do-detail',
    templateUrl: './to-do-detail.component.html',
    styleUrls: ['./to-do-detail.component.css']
})
export class ToDoDetailComponent implements OnInit {

    @ViewChild('deleteConfirmationDialog')
    deleteConfirmationGenericModelDialog!: GenericDialogModelComponent;

    @ViewChild('saveConfirmationDialog')
    saveConfirmationGenericModelDialog!: GenericDialogModelComponent;


    currentToDoTask: ToDoTask | null | undefined = undefined;

    private history: string[] = []

    private activatedRouteSubscription!: Subscription;

    private routerEventSubscription: Subscription;


    taskEditForm!: FormGroup;

    taskEditValueChangeSubscription!: Subscription;

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
        this.subscribeToActivatedRoute();
        this.initializeTaskEditForm();

    }

    ngOnDestroy() {
        this.activatedRouteSubscription.unsubscribe();
        this.routerEventSubscription.unsubscribe();

        this.taskEditValueChangeSubscription.unsubscribe();
        console.log("+++++++++++++++++++++++++++++destroying to-do detail component");
    }


    subscribeToActivatedRoute() {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe((updatedParams: Params) => {
            const allParams: Params = this.utilService.getAllRouteParams1(this.activatedRoute);
            console.log("all params are :", allParams);
            const categoryId = allParams['categoryId'];
            const providedTaskId = allParams['taskId'];

            console.log("Provided taskId is : ", providedTaskId);
            this.currentToDoTask = this.taskManagementService.findByTaskId(categoryId, providedTaskId);

            if (!this.currentToDoTask) {
                this.router.navigate(['../'], {
                    relativeTo: this.activatedRoute
                });
            }
        });
    }


    initializeTaskEditForm() {
        this.taskEditForm = new FormGroup({
            'taskTitle': new FormControl(this.currentToDoTask?.getTitle(), [Validators.required]),
            'taskContent': new FormControl(this.currentToDoTask?.getTextContent(), Validators.required),
        });

        this.taskEditValueChangeSubscription = this.taskEditForm.valueChanges.subscribe(values => {
            this.areSomeEquivalent(this.currentToDoTask, values);
        });
    }


    areSomeEquivalent(a: any, b: any) {
        const parameters: string[] = ['taskTitle', 'taskContent'];
        const n = parameters.length;

        for (let i = 0; i < n; ++i) {
            const propName = parameters[i];
            if (a[propName] !== b[propName]) {
                this.taskEditForm.markAsDirty();
                return;
            }
        }
        this.taskEditForm.markAsPristine();
    }



    ngAfterViewInit() {

        //was put here as not this life cycle hook runs when all the dom element are made(except external api call eg. http);
        // this.initializeDeleteConfirmationModelDialog();


        this.deleteConfirmationGenericModelDialog.subscribe(() => {
            this.confirmDeleteTask();
            /*
                        Arrow functions do not bind their own this, instead, they inherit the
                        one from the parent scope, which is called "lexical scoping".
                        With normal functions the scoped is bound to the global one by default,
                        arrows functions, as I said before, do not have their own this but they inherit
                        it from the parent scope, doesn't matter if we use strict,
                        so what is happening is that since here this is of our main class scope, so when confirmDeleteTask is
                        called here this represent the current class object and when later this arrow function is passed as callback,
                            it runs normally, .Without arrow function we would have to use bind with the normal function as our normal
                        function will not be passed with this, so when it will be called later as a callback, at that time, it will use this
                        of that time, so then we can pass this normal function as an argument after binding it with current class this like
                        FunctionCall(this.confirmDeleteTask.bind(this));
                        or we can just use this trick, same trick is used with subsribing the observables or subjects */
        });

        this.saveConfirmationGenericModelDialog.subscribe(() => {
            this.confirmSaveTask();
        });



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


    onTaskSaveAction() {
        console.log(this.taskEditForm);
        this.saveConfirmationGenericModelDialog.show();
    }

    onTaskDeleteAction() {
        // this.deleteConfirmationModalDialog.show();
        this.deleteConfirmationGenericModelDialog.show();
    }


    confirmDeleteTask() {

        console.log("confirm delete called");
        console.log("hi there deleting the task");
        console.log("this is : ", this);
        if (this.currentToDoTask) {
            this.taskManagementService.deleteTaskById(this.currentToDoTask.getTaskCategoryId(), this.currentToDoTask.getTodoId());
            this.currentToDoTask = undefined;
        }
        this.deleteConfirmationGenericModelDialog.hide();
    }

    confirmSaveTask() {
        this.onUpdate();
        this.saveConfirmationGenericModelDialog.hide();
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
            //doesn't matter both are equivalent, it's just that this.localation.back has history of same route that
            // we want to go back to through this.router.navigate(['../'], { relativeTo: this.activatedRoute });
            // this.router.navigate(['../'], { relativeTo: this.activatedRoute });
            this.location.back()
        } else {
            // in case we opened the browser directly with this link, or new tab with this link, then try to go back
            console.debug("going back through backup as no history is there-----------------");
            this.router.navigateByUrl('/')
        }
    }
}
