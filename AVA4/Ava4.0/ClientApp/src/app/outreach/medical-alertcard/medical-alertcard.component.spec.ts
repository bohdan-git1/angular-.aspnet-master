import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAlertcardComponent } from './medical-alertcard.component';

describe('MedicalAlertcardComponent', () => {
  let component: MedicalAlertcardComponent;
  let fixture: ComponentFixture<MedicalAlertcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalAlertcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalAlertcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
