import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxCardDdrpdnComponent } from './tx-card-ddrpdn.component';

describe('TxCardDdrpdnComponent', () => {
  let component: TxCardDdrpdnComponent;
  let fixture: ComponentFixture<TxCardDdrpdnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxCardDdrpdnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxCardDdrpdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
