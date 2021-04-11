import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTaskListComponent } from './single-task-list.component';

describe('SingleTaskListComponent', () => {
  let component: SingleTaskListComponent;
  let fixture: ComponentFixture<SingleTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
