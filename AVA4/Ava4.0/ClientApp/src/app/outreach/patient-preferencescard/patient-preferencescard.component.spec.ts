import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPreferencescardComponent } from './patient-preferencescard.component';

describe('PatientPreferencescardComponent', () => {
  let component: PatientPreferencescardComponent;
  let fixture: ComponentFixture<PatientPreferencescardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPreferencescardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPreferencescardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
