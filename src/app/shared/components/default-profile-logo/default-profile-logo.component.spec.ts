import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultProfileLogoComponent } from './default-profile-logo.component';

describe('DefaultProfileLogoComponent', () => {
  let component: DefaultProfileLogoComponent;
  let fixture: ComponentFixture<DefaultProfileLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultProfileLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultProfileLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
