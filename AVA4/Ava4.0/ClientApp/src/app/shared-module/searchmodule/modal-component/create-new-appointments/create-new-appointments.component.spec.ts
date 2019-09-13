import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewAppointmentsComponent } from './create-new-appointments.component';

describe('CreateNewAppointmentsComponent', () => {
  let component: CreateNewAppointmentsComponent;
  let fixture: ComponentFixture<CreateNewAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
