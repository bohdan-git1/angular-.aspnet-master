import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFinanceComponent } from './settings-finance.component';

describe('SettingsFinanceComponent', () => {
  let component: SettingsFinanceComponent;
  let fixture: ComponentFixture<SettingsFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
