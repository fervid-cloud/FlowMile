import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoBoxComponent } from './to-do-box.component';

describe('ToDoBoxComponent', () => {
  let component: ToDoBoxComponent;
  let fixture: ComponentFixture<ToDoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
