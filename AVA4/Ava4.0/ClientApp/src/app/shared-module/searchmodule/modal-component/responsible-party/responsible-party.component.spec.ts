import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiblePartyComponent } from './responsible-party.component';

describe('ResponsiblePartyComponent', () => {
  let component: ResponsiblePartyComponent;
  let fixture: ComponentFixture<ResponsiblePartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiblePartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiblePartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
