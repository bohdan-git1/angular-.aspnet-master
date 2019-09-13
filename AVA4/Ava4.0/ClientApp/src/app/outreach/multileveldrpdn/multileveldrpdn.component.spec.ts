import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultileveldrpdnComponent } from './multileveldrpdn.component';

describe('MultileveldrpdnComponent', () => {
  let component: MultileveldrpdnComponent;
  let fixture: ComponentFixture<MultileveldrpdnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultileveldrpdnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultileveldrpdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
