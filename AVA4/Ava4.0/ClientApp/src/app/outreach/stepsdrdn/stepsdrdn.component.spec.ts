import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsdrdnComponent } from './stepsdrdn.component';

describe('StepsdrdnComponent', () => {
  let component: StepsdrdnComponent;
  let fixture: ComponentFixture<StepsdrdnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsdrdnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsdrdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
