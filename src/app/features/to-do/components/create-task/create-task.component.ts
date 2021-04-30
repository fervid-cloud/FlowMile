import { animate, keyframes, sequence, state, style, transition, trigger } from '@angular/animations';
import { isEmptyExpression } from '@angular/compiler';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UtilService } from 'src/app/shared/utility/util-service/util.service';
import { Task } from '../../model/task';
import { TaskManagementService } from '../../service/to-do-management/task-management.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'create-task',
    templateUrl: './create-task.component.html',
    styleUrls: [ './create-task.component.css' ],
    animations: [
        trigger('customLeftToRightAngularAnimation', [
            //non exising(in dom) to existing state of element
            transition('void => *', [
                animate(500, keyframes([
                    style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
                    style({opacity: 1, transform: 'translateX(15px)', offset: 0.3}),
                    style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
                ]))
            ]),
            //existing to non-existing state of element
            transition('* => void', [
                animate(500, keyframes([
                    style({opacity: 1, transform: 'translateX(0)', offset: 0}),
                    style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
                    style({opacity: 0, transform: 'translateX(100%)', offset: 1.0})
                ]))
            ])
        ])
    ]
})
export class CreateTaskComponent implements OnInit, OnDestroy {

    taskCategoryId!: number;

    addTaskForm!: FormGroup;

    invalidityReasons: string[] = [];

    @ViewChild('crudOperationsParentButton')
    crudOperationsParentButtonTemplateRef!: ElementRef;

    private activatedRoutedSubscription;

    constructor(
        private taskManagementService: TaskManagementService,
        private activatedRoute: ActivatedRoute,
        private toastrService: ToastrService
    ) {
        this.activatedRoutedSubscription = this.activatedRoute.params.subscribe((params: Params) => {
            const allParams: Params = UtilService.getAllRouteParams1(this.activatedRoute);
            this.taskCategoryId = allParams.categoryId;
        });
    }

    ngOnInit(): void {
        // if we have to use viewChild decorated object here, decllare it like this
        // @ViewChild('elementLocalRefereneName', { static: true }) element: ElementRef;
        // { static: true } as a second argument) needs to be applied to ALL usages of @ViewChild()(and also
        // @ContentChild() which you'll learn about later) IF you plan on accessing the selected element inside of ngOnInit().
        // If you DON'T access the selected element in ngOnInit (but anywhere else in your component), set static: false instead!
        // Angular 9 +, you only need to add { static: true } (if needed) but not { static: false }.
        this.initializeAddTaskForm();
    }

    ngOnDestroy() {
        this.activatedRoutedSubscription.unsubscribe();
    }


    private initializeAddTaskForm() {
        this.addTaskForm = new FormGroup({
            name: new FormControl(null, [ Validators.required ]),
            description: new FormControl(null, [ Validators.required ])
        });
    }


    async onSubmit() {
        this.invalidityReasons = [];
        if (this.addTaskForm.invalid) {
            console.log(this.addTaskForm);
            this.addRequiredErrorMessages();
            return;
        }

        const crudOperationsParentButton = this.crudOperationsParentButtonTemplateRef.nativeElement;
        crudOperationsParentButton.classList.add('buttonDisable');
        this.addTaskForm.disable();
        const name = this.addTaskForm.get('name')?.value; // telling the compiler that value wil always exist
        const description = this.addTaskForm.get('description')?.value; // another trick using optional chaining
        console.log('task added');

        await new Promise((resolve) => setTimeout(() => resolve(true), 3000));
        const result: boolean = await this.taskManagementService.createTask({
            name,
            description,
            categoryId: this.taskCategoryId
        });

        if (result) {
            this.toastrService.success('Task Created Successfully', 'Success', {
                progressBar: true,
                positionClass: 'toast-bottom-right',
            });
        }
        crudOperationsParentButton.classList.remove('buttonDisable');
        this.addTaskForm.enable();
    }


    onReset() {
        this.addTaskForm.reset();
        this.invalidityReasons = [];
    }

    private addRequiredErrorMessages() {
        if (this.addTaskForm.get('name')?.errors?.required) {
            this.invalidityReasons.push('Name is required');
        }

        if (this.addTaskForm.get('description')?.errors?.required) {
            this.invalidityReasons.push('Description is required');
        }
    }
}
