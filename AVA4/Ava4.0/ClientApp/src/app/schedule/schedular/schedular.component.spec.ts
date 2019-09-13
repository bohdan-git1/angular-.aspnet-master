import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedularComponent } from './schedular.component';

describe('SchedularComponent', () => {
  let component: SchedularComponent;
  let fixture: ComponentFixture<SchedularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
