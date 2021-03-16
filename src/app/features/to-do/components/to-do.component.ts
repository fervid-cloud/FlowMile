import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToDoTask } from '../model/to-do-task';
import { ToDoManagementService } from '../service/to-do-management/to-do-management.service';

@Component({
    selector: 'app-to-do',
    templateUrl: './to-do.component.html',
    styleUrls: ['./to-do.component.css']

})
export class ToDoComponent implements OnInit {

    constructor(private router : Router, private activatedRoute : ActivatedRoute) { }

    ngOnInit(): void {
        // by default angular nagivates relative to root route
        // this.router.navigate(["list", "all"], {
        //     relativeTo: this.activatedRoute
        // });
    }

}
