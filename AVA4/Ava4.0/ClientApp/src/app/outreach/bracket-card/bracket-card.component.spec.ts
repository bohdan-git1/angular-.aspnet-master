import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketCardComponent } from './bracket-card.component';

describe('BracketCardComponent', () => {
  let component: BracketCardComponent;
  let fixture: ComponentFixture<BracketCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BracketCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BracketCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
