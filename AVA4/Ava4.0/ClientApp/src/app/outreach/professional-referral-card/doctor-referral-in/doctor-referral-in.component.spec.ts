import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorReferralInComponent } from './doctor-referral-in.component';

describe('DoctorReferralInComponent', () => {
  let component: DoctorReferralInComponent;
  let fixture: ComponentFixture<DoctorReferralInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorReferralInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorReferralInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
