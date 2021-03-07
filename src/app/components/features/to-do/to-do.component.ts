import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-to-do',
    templateUrl: './to-do.component.html',
    styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {

    }

    private makeArray(n: number) : number []{
        const currentArray = [];
        for (let i = 0; i < n; ++i) {
            currentArray.push(0);
        }
        return currentArray;
    }

    getArray(n: number) : number [] {
        return this.makeArray(n);;
    }

}
