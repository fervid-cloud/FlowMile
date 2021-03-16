import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoCategoryComponent } from './to-do-category.component';

describe('ToDoCategoryComponent', () => {
  let component: ToDoCategoryComponent;
  let fixture: ComponentFixture<ToDoCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
