import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProcedureEventComponent } from './create-procedure-event.component';

describe('CreateProcedureEventComponent', () => {
  let component: CreateProcedureEventComponent;
  let fixture: ComponentFixture<CreateProcedureEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProcedureEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProcedureEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
