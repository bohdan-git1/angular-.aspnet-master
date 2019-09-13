import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientmodalddProfileComponent } from './patientmodaldd-profile.component';

describe('PatientmodalddProfileComponent', () => {
  let component: PatientmodalddProfileComponent;
  let fixture: ComponentFixture<PatientmodalddProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientmodalddProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientmodalddProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
