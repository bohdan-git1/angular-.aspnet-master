import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayscheduleComponent } from './payschedule.component';

describe('PayscheduleComponent', () => {
  let component: PayscheduleComponent;
  let fixture: ComponentFixture<PayscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
