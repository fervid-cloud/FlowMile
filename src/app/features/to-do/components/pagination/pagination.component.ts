import { Component, Input, OnInit } from '@angular/core';
import { PaginationWrapperDto } from '../../model/pagination-wrapper-dto';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: [ './pagination.component.css' ]
})
export class PaginationComponent implements OnInit {

    static MAX_WINDOW_SIZE: number = 5;

    static MIDDLE_ELEMENT_POSITION_NUMBER = (PaginationComponent.MAX_WINDOW_SIZE + 1) / 2;

    // by default same name
    @Input() itemsInfoPage: PaginationWrapperDto = new PaginationWrapperDto();

    currentPageIndicatorList: number[] = [];




    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit(): void {
        this.updatePaginationInfo();
    }

    updateCurrentPage(newPageNumber: number): void {
        this.router.navigate([], {
            queryParams: {page: newPageNumber},
            relativeTo: this.activatedRoute
        });
    }


    private updatePaginationInfo(): void {
        console.log('pagination info is : ', this.itemsInfoPage);

        const currentPageNumber = this.itemsInfoPage.pageNumber;
        let realStart: number;
        let realEnd: number;

        if (currentPageNumber <= PaginationComponent.MIDDLE_ELEMENT_POSITION_NUMBER) {
            realStart = 1;
            realEnd = Math.min(PaginationComponent.MAX_WINDOW_SIZE, this.itemsInfoPage.totalPages);
        } else if (currentPageNumber >= this.itemsInfoPage.totalPages - (PaginationComponent.MIDDLE_ELEMENT_POSITION_NUMBER - 2)) {
            realEnd = this.itemsInfoPage.totalPages;
            realStart = Math.max(this.itemsInfoPage.totalPages - (PaginationComponent.MAX_WINDOW_SIZE - 1), 1);
        } else {
            realStart = currentPageNumber - (PaginationComponent.MIDDLE_ELEMENT_POSITION_NUMBER - 1);
            realEnd = currentPageNumber + (PaginationComponent.MIDDLE_ELEMENT_POSITION_NUMBER - 1);
        }

        for (let i = realStart; i <= realEnd; ++i) {
            this.currentPageIndicatorList.push(i);
        }
    }
}
