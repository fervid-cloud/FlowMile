import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoTask } from '../../model/to-do-task';

@Component({
    selector: 'app-single-task-list',
    templateUrl: './single-task-list.component.html',
    styleUrls: ['./single-task-list.component.css']
})
export class SingleTaskListComponent implements OnInit {

    @Input("taskList") tasks: ToDoTask[] = [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        console.log("the input tasks are : ");
        console.log(this.tasks);
    }


    onChoosingViewDetail(taskId: number) {
        this.router.navigate([taskId], {
            relativeTo: this.activatedRoute
        });
    }

}
