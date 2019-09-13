import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentmeterComponent } from './treatmentmeter.component';

describe('TreatmentmeterComponent', () => {
  let component: TreatmentmeterComponent;
  let fixture: ComponentFixture<TreatmentmeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentmeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentmeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
