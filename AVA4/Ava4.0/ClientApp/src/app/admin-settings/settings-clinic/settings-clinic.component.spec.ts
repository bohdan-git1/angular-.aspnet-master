import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsClinicComponent } from './settings-clinic.component';

describe('SettingsClinicComponent', () => {
  let component: SettingsClinicComponent;
  let fixture: ComponentFixture<SettingsClinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsClinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
