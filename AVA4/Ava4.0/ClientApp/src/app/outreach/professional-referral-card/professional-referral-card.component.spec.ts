import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalReferralCardComponent } from './professional-referral-card.component';

describe('ProfessionalReferralCardComponent', () => {
  let component: ProfessionalReferralCardComponent;
  let fixture: ComponentFixture<ProfessionalReferralCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalReferralCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalReferralCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
