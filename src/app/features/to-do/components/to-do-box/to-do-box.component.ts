import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../model/task';

@Component({
    selector: 'app-to-do-box',
    templateUrl: './to-do-box.component.html',
    styleUrls: ['./to-do-box.component.css']
})
export class ToDoBoxComponent implements OnInit {

    @Input() unitTodo: Task = new Task();

    @Output() viewEventNotifier: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onViewClick(): void{
        console.debug('view------------- clicked');
        this.viewEventNotifier.emit(this.unitTodo.id);
    }

}
