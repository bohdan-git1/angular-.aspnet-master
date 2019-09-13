import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistCardComponent } from './dentist-card.component';

describe('DentistCardComponent', () => {
  let component: DentistCardComponent;
  let fixture: ComponentFixture<DentistCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DentistCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
