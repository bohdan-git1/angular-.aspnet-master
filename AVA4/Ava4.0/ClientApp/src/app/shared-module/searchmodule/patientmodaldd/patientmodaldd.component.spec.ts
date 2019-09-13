import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientmodalddComponent } from './patientmodaldd.component';

describe('PatientmodalddComponent', () => {
  let component: PatientmodalddComponent;
  let fixture: ComponentFixture<PatientmodalddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientmodalddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientmodalddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
