import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedDDOptionsComponent } from './selected-ddoptions.component';

describe('SelectedDDOptionsComponent', () => {
  let component: SelectedDDOptionsComponent;
  let fixture: ComponentFixture<SelectedDDOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedDDOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedDDOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
