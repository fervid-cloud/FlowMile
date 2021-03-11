import { Component, Input, OnInit } from '@angular/core';
import { ToDoTask } from '../../model/to-do-task';

@Component({
    selector: 'app-to-do-box',
    templateUrl: './to-do-box.component.html',
    styleUrls: ['./to-do-box.component.css']
})
export class ToDoBoxComponent implements OnInit {

    @Input() unitTodo: ToDoTask = new ToDoTask();

    constructor() { }

    ngOnInit(): void {
    }


}
