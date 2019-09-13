import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsClinicDiagnosisComponent } from './settings-clinic-diagnosis.component';

describe('SettingsClinicDiagnosisComponent', () => {
  let component: SettingsClinicDiagnosisComponent;
  let fixture: ComponentFixture<SettingsClinicDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsClinicDiagnosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsClinicDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
