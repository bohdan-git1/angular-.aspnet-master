import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxplanCardComponent } from './txplan-card.component';

describe('TxplanCardComponent', () => {
  let component: TxplanCardComponent;
  let fixture: ComponentFixture<TxplanCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxplanCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxplanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
