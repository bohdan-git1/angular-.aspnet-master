import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardaccordionComponent } from './cardaccordion.component';

describe('CardaccordionComponent', () => {
  let component: CardaccordionComponent;
  let fixture: ComponentFixture<CardaccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardaccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardaccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
