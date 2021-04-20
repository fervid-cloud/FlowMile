import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard-body',
    templateUrl: './dashboard-body.component.html',
    styleUrls: ['./dashboard-body.component.css']
})
export class DashboardBodyComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }


    public handleChosenOption(eventData: string) {
        console.log("The eventData is : ", eventData);
        // this.router.navigate(["dashboard/todo"]);
    }
}
