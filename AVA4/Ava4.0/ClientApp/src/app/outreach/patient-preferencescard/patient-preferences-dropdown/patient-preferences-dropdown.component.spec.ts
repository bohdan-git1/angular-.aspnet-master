import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPreferencesDropdownComponent } from './patient-preferences-dropdown.component';

describe('PatientPreferencesDropdownComponent', () => {
  let component: PatientPreferencesDropdownComponent;
  let fixture: ComponentFixture<PatientPreferencesDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPreferencesDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPreferencesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
