import { Component, Input, OnInit } from '@angular/core';
import { PaginationWrapperDto } from '../../model/pagination-wrapper-dto';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: [ './pagination.component.css' ]
})
export class PaginationComponent implements OnInit {

    // by default same name
    @Input() itemsInfoPage: PaginationWrapperDto = new PaginationWrapperDto();

    currentPageIndicatorList: number[] = [];

    currentAvailablePageWindowSize: number = 6;


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit(): void {
        console.log("pagination info is : ", this.itemsInfoPage);
        this.currentAvailablePageWindowSize = Math.min(this.currentAvailablePageWindowSize, this.itemsInfoPage.totalPages);
        for (let i = 1; i <= this.currentAvailablePageWindowSize; ++i) {
            this.currentPageIndicatorList.push(i);
        }
    }

    updateCurrentPage(newPageNumber: number): void {
        this.router.navigate([], {
            queryParams: { page: newPageNumber },
            relativeTo: this.activatedRoute
        });
    }
}
