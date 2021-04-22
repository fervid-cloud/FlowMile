import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'animated-search-input',
    templateUrl: './animated-search-input.component.html',
    styleUrls: [ './animated-search-input.component.css' ]
})
export class AnimatedSearchInputComponent implements OnInit {

    searchInputValue: string = '';

    @ViewChild('searchInputButton') searchInputButton!: ElementRef;

    @Output() onTyping: EventEmitter<string> = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    removeInputSearch(): void {
        console.log('search input value is : ', this.searchInputValue);
        this.searchInputValue = '';
        this.indicateTyping();
    }


    toggleSearchInputBar(): void {
        this.searchInputButton.nativeElement.classList.toggle("openedSearchInput");
    }

    resetOpenedSearchBar(): void {
        this.searchInputButton?.nativeElement?.classList?.remove("openedSearchInput");
        this.searchInputValue = "";
    }

    indicateTyping(): void {
        this.onTyping.emit(this.searchInputValue.trim());
    }
}
