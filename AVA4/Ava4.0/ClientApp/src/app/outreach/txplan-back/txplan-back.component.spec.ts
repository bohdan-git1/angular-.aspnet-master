import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxplanBackComponent } from './txplan-back.component';

describe('TxplanBackComponent', () => {
  let component: TxplanBackComponent;
  let fixture: ComponentFixture<TxplanBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxplanBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxplanBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
