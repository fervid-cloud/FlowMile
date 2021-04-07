import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCategoryComponent } from './single-category.component';

describe('ToDoComponent', () => {
  let component: SingleCategoryComponent;
  let fixture: ComponentFixture<SingleCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*
When it comes to @Input() and @Output() decorators, which style of passing is it ?

    Angular Components: Pass by Reference or Pass by Value ?

    In Angular, you can pass data from a parent component to a child component using the @Input() decorator, and a child component can emit an event to a parent component using the @Output() decorator.

You can learn more about the @Input() decorator and about the @Output decorator here.

The purpose of this blog post is to explain to you whether it is better to pass by reference or pass by value in the context of the @Input() and the @Output decorator.

To start with, let us assume that we have two components, as listed below:


import { Component, Input } from '@angular/core';
@Component({
    selector: 'app-video',
    template: `
        {{data.counter}} {{count}}
     `
})
export class VideoComponent {

    @Input() data: any;
    @Input() count: number;

}

As you see, we have two input properties.

In data property, we will pass an object.
In count property, we will pass a number.
From AppComponent, we are passing the values for both properties, as shown below:

    import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
  <app-video [data]='data' [count]='count' ></app-video>
  `
})
export class AppComponent implements OnInit {
    data: any = {};
    count: number;
    constructor() {
    }

    ngOnInit() {
        this.data.counter = 1;
        this.count = 1;
    }
}


As you see, we are passing data(object) and count(number) to the child component.Since data is being passed as an object, it will "Pass by Reference" and, since count is passed as number, it will "Pass by Value."

Therefore, if passing an object, array, or the like, then it is Passed by Reference, and for primitive types like numbers, it is Passed by Value.

To better understand it, let us raise two events on the child component, as shown in the listing below:

import { Component, Input, EventEmitter, Output } from '@angular/core';
@Component({
    selector: 'app-video',
    template: `
        {{data.counter}} {{count}}
        <button (click)='senddata()'>send data</button>
        <button (click)='sendcount()'>send count</button>
     `
})
export class VideoComponent {

    @Input() data: any;
    @Input() count: number;

    @Output() dataEvent = new EventEmitter();
    @Output() countEvent = new EventEmitter();

    senddata() {
        this.dataEvent.emit(this.data);

    }
    sendcount() {
        this.countEvent.emit(this.count);
    }

}

In both events, we are passing back the same @Input() decorated properties to the parent component.In dataEvent, the data is passed back and in countEvent the count is passed back to the parent component.

In the parent component, we are capturing the event as below:

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
  <app-video [data]='data' [count]='count' (dataEvent)='updateData($event)' (countEvent)='updateCount($event)' ></app-video>
  `
})
export class AppComponent implements OnInit {
    data: any = {};
    count: number;
    constructor() {
    }

    ngOnInit() {
        this.data.counter = 1;
        this.count = 1;
    }

    updateData(d) {
        d.counter = d.counter + 1;
        console.log(this.data.counter);
    }

    updateCount(c) {
        c = c + 1;
        console.log(this.count);
    }
}

Let us talk through the updateData and updateCount functions.These functions are capturing events raised on the child component.

In the updateData function, we are incrementing the value of the passed parameter, however, since it is an object, it will update the value of this.data and in the child component, the updated value will be rendered.

In the updateCount function, we are incrementing the value of the passed parameter, however, since it is a primitive type it will not update this.count and in the child component nothing will happen.

As an output on clicking of button, you will find the value of the data is incrementing but the value of the count is not incrementing.

We can summarize this as follows: if we pass objects in the @Input() decorator then it would be passed as a reference, and if we pass primitive types, then it would be passed as a value.I hope you found this article useful.Thanks for reading!

*/