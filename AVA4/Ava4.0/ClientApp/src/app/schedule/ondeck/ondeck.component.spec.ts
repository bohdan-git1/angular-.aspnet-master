import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OndeckComponent } from './ondeck.component';

describe('OndeckComponent', () => {
  let component: OndeckComponent;
  let fixture: ComponentFixture<OndeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OndeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OndeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
