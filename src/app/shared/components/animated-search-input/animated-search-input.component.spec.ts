import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedSearchInputComponent } from './animated-search-input.component';

describe('AnimatedSearchInputComponent', () => {
  let component: AnimatedSearchInputComponent;
  let fixture: ComponentFixture<AnimatedSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedSearchInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
