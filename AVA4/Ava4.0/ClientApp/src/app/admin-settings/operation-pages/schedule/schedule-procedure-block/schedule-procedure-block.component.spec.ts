import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleProcedureBlockComponent } from './schedule-procedure-block.component';

describe('ScheduleProcedureBlockComponent', () => {
  let component: ScheduleProcedureBlockComponent;
  let fixture: ComponentFixture<ScheduleProcedureBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleProcedureBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleProcedureBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
