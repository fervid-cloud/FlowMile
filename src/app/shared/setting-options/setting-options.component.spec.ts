import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingOptionsComponent } from './setting-options.component';

describe('SettingOptionsComponent', () => {
  let component: SettingOptionsComponent;
  let fixture: ComponentFixture<SettingOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
