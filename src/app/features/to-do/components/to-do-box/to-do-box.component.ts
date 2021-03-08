import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../model/to-do';

@Component({
    selector: 'app-to-do-box',
    templateUrl: './to-do-box.component.html',
    styleUrls: ['./to-do-box.component.css']
})
export class ToDoBoxComponent implements OnInit {

    @Input() unitTodo: Todo = new Todo();

    constructor() { }

    ngOnInit(): void {
    }


}
