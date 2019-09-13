import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasePresentationComponent } from './case-presentation.component';

describe('CasePresentationComponent', () => {
  let component: CasePresentationComponent;
  let fixture: ComponentFixture<CasePresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasePresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
