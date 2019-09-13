import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientblockComponent } from './patientblock.component';

describe('PatientblockComponent', () => {
  let component: PatientblockComponent;
  let fixture: ComponentFixture<PatientblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
