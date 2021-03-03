import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
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
