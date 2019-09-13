import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentNotificationComponent } from './treatment-notification.component';

describe('TreatmentNotificationComponent', () => {
  let component: TreatmentNotificationComponent;
  let fixture: ComponentFixture<TreatmentNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
