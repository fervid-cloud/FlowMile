import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDoTask } from '../../model/to-do-task';

@Component({
    selector: 'app-to-do-box',
    templateUrl: './to-do-box.component.html',
    styleUrls: ['./to-do-box.component.css']
})
export class ToDoBoxComponent implements OnInit {

    @Input() unitTodo: ToDoTask = new ToDoTask();

    @Output() viewEventNotifier: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onViewClick() {
        console.debug("view------------- clicked");
        this.viewEventNotifier.emit(this.unitTodo.getTodoId());
    }

}
