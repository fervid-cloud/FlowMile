import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeWriterWordSimulatorComponent } from './type-writer-word-simulator.component';

describe('TypeWriterWordSimulatorComponent', () => {
  let component: TypeWriterWordSimulatorComponent;
  let fixture: ComponentFixture<TypeWriterWordSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeWriterWordSimulatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeWriterWordSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
