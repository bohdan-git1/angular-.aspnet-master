import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCalenderComponent } from './single-calender.component';

describe('SingleCalenderComponent', () => {
  let component: SingleCalenderComponent;
  let fixture: ComponentFixture<SingleCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
