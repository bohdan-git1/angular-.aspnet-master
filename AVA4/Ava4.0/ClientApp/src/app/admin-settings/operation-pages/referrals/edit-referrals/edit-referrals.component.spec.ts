import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReferralsComponent } from './edit-referrals.component';

describe('EditReferralsComponent', () => {
  let component: EditReferralsComponent;
  let fixture: ComponentFixture<EditReferralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReferralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReferralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
