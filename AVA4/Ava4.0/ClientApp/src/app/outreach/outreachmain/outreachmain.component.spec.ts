import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutreachmainComponent } from './outreachmain.component';

describe('OutreachmainComponent', () => {
  let component: OutreachmainComponent;
  let fixture: ComponentFixture<OutreachmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutreachmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutreachmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
