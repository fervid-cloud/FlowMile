import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFilterDropdownComponent } from './custom-filter-dropdown.component';

describe('CustomFilterDropdownComponent', () => {
  let component: CustomFilterDropdownComponent;
  let fixture: ComponentFixture<CustomFilterDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFilterDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFilterDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
