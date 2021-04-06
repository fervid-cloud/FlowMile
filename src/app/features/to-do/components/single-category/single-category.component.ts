import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToDoTask } from '../../model/to-do-task';
import { ToDoManagementService } from '../../service/to-do-management/to-do-management.service';

@Component({
    selector: 'app-single-category',
    templateUrl: './single-category.component.html',
    styleUrls: ['./single-category.comonent.css']

})
export class SingleCategoryComponent implements OnInit {


    constructor(private router : Router, private activatedRoute : ActivatedRoute) { }

    ngOnInit(): void {
        // by default angular nagivates relative to root route
        // this.router.navigate(["list", "all"], {
        //     relativeTo: this.activatedRoute
        // });
    }

}
