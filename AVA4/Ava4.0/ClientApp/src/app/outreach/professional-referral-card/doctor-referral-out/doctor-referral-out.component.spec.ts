import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorReferralOutComponent } from './doctor-referral-out.component';

describe('DoctorReferralOutComponent', () => {
  let component: DoctorReferralOutComponent;
  let fixture: ComponentFixture<DoctorReferralOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorReferralOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorReferralOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
