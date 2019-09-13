import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayEventBolckComponent } from './day-event-bolck.component';

describe('DayEventBolckComponent', () => {
  let component: DayEventBolckComponent;
  let fixture: ComponentFixture<DayEventBolckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayEventBolckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayEventBolckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
