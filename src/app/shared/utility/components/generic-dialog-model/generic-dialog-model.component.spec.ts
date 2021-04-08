import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDialogModelComponent } from './generic-dialog-model.component';

describe('GenericDialogModelComponent', () => {
  let component: GenericDialogModelComponent;
  let fixture: ComponentFixture<GenericDialogModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericDialogModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericDialogModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
