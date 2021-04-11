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


    onChoosingViewDetail(taskId: number) {
        this.router.navigate([taskId], {
            relativeTo: this.activatedRoute
        });
    }

}
