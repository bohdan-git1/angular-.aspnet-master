import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReferralCardComponent } from './patient-referral-card.component';

describe('PatientReferralCardComponent', () => {
  let component: PatientReferralCardComponent;
  let fixture: ComponentFixture<PatientReferralCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientReferralCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientReferralCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
