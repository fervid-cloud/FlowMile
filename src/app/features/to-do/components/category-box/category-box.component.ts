import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskCategory } from '../../model/task-category';

@Component({
    selector: 'app-category-box',
    templateUrl: './category-box.component.html',
    styleUrls: ['./category-box.component.css']
})
export class CategoryBoxComponent implements OnInit {

    @Input() currentTaskCategory!: TaskCategory;

    @Output() viewEventNotifier: EventEmitter<number> = new EventEmitter<number>();

    constructor() { }

    ngOnInit(): void {
    }

    onViewClick() {
        console.debug("tategory view------------- clicked");
        this.viewEventNotifier.emit(this.currentTaskCategory.id);
    }

}
