import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }


    public handleChoosenOption(eventData: string) {
        console.log("The eventData is : ", eventData);
        // this.router.navigate(["dashboard/todo"]);
    }
}
