import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorLocationComponent } from './doctor-location.component';

describe('DoctorLocationComponent', () => {
  let component: DoctorLocationComponent;
  let fixture: ComponentFixture<DoctorLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
