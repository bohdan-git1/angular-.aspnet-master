import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XrayScanComponent } from './xray-scan.component';

describe('XrayScanComponent', () => {
  let component: XrayScanComponent;
  let fixture: ComponentFixture<XrayScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XrayScanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XrayScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
