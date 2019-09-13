import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsAcordionddnComponent } from './goals-acordionddn.component';

describe('GoalsAcordionddnComponent', () => {
  let component: GoalsAcordionddnComponent;
  let fixture: ComponentFixture<GoalsAcordionddnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalsAcordionddnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsAcordionddnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
