import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElasticTreatmentComponent } from './elastic-treatment.component';

describe('ElasticTreatmentComponent', () => {
  let component: ElasticTreatmentComponent;
  let fixture: ComponentFixture<ElasticTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElasticTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElasticTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
