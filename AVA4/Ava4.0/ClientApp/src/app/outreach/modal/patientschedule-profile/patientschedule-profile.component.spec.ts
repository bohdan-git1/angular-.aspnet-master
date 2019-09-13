import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientscheduleProfileComponent } from './patientschedule-profile.component';

describe('PatientscheduleProfileComponent', () => {
  let component: PatientscheduleProfileComponent;
  let fixture: ComponentFixture<PatientscheduleProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientscheduleProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientscheduleProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
