import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsCardComponent } from './steps-card.component';

describe('StepsCardComponent', () => {
  let component: StepsCardComponent;
  let fixture: ComponentFixture<StepsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
