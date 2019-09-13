import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOperationComponent } from './settings-operation.component';

describe('SettingsOperationComponent', () => {
  let component: SettingsOperationComponent;
  let fixture: ComponentFixture<SettingsOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
