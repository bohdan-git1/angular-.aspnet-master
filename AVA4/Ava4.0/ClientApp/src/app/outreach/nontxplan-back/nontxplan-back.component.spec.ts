import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NontxplanBackComponent } from './nontxplan-back.component';

describe('NontxplanBackComponent', () => {
  let component: NontxplanBackComponent;
  let fixture: ComponentFixture<NontxplanBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NontxplanBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NontxplanBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
