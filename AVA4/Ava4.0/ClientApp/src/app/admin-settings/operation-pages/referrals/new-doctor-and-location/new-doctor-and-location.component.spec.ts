import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDoctorAndLocationComponent } from './new-doctor-and-location.component';

describe('NewDoctorAndLocationComponent', () => {
  let component: NewDoctorAndLocationComponent;
  let fixture: ComponentFixture<NewDoctorAndLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDoctorAndLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDoctorAndLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
