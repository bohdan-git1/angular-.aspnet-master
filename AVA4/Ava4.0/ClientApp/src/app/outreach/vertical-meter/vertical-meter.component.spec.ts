import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalMeterComponent } from './vertical-meter.component';

describe('VerticalMeterComponent', () => {
  let component: VerticalMeterComponent;
  let fixture: ComponentFixture<VerticalMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalMeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
