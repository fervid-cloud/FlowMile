import { Component, Input, OnInit } from '@angular/core';
import { PaginationWrapperDto } from '../../model/pagination-wrapper-dto';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: [ './pagination.component.css' ]
})
export class PaginationComponent implements OnInit {

    // by default same name
    @Input() tasksInfoPage: PaginationWrapperDto = new PaginationWrapperDto();

    currentPageIndicatorArray: number[];

    constructor() {
        this.currentPageIndicatorArray = [];
    }

    ngOnInit(): void {

    }




}
