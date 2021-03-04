import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


    @Output() optionChoosen: EventEmitter<string> = new EventEmitter<string>();
    constructor() { }

    ngOnInit(): void {
    }


    handleClickOnOption(event: Event) {
        console.log("clicked happened");
        const currentElement: HTMLElement = event.currentTarget as HTMLElement;
        const optionName = currentElement.dataset['name'];
        this.optionChoosen.emit(optionName);

    }

    toggleDropdown(event: MouseEvent) {
        console.log("clicked");
        const element: HTMLElement = event.currentTarget as HTMLElement;
        console.log(element.dataset);
        if (element.dataset['customToggler']) {
            element.parentElement?.classList.toggle("open");
        }
    }
}
