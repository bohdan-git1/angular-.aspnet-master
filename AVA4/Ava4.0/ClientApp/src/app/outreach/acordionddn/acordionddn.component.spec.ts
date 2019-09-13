import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcordionddnComponent } from './acordionddn.component';

describe('AcordionddnComponent', () => {
  let component: AcordionddnComponent;
  let fixture: ComponentFixture<AcordionddnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcordionddnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcordionddnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
