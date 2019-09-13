import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairNumSelectorComponent } from './chair-num-selector.component';

describe('ChairNumSelectorComponent', () => {
  let component: ChairNumSelectorComponent;
  let fixture: ComponentFixture<ChairNumSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChairNumSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChairNumSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
