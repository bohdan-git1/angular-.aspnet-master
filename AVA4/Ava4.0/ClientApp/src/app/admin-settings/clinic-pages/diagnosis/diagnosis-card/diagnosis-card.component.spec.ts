import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisCardComponent } from './diagnosis-card.component';

describe('DiagnosisCardComponent', () => {
  let component: DiagnosisCardComponent;
  let fixture: ComponentFixture<DiagnosisCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosisCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
