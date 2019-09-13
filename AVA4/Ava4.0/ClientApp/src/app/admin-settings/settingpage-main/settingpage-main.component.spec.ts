import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingpageMainComponent } from './settingpage-main.component';

describe('SettingpageMainComponent', () => {
  let component: SettingpageMainComponent;
  let fixture: ComponentFixture<SettingpageMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingpageMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingpageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
