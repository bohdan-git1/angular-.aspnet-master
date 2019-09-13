import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxplanOptionselectorComponent } from './txplan-optionselector.component';

describe('TxplanOptionselectorComponent', () => {
  let component: TxplanOptionselectorComponent;
  let fixture: ComponentFixture<TxplanOptionselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxplanOptionselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxplanOptionselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
