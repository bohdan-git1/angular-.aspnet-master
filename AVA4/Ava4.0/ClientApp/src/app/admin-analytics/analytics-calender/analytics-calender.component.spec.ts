import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsCalenderComponent } from './analytics-calender.component';

describe('AnalyticsCalenderComponent', () => {
  let component: AnalyticsCalenderComponent;
  let fixture: ComponentFixture<AnalyticsCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
