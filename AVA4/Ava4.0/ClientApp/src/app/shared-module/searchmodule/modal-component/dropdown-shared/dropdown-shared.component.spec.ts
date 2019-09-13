import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSharedComponent } from './dropdown-shared.component';

describe('DropdownSharedComponent', () => {
  let component: DropdownSharedComponent;
  let fixture: ComponentFixture<DropdownSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
