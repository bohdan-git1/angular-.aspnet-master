import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownRelationshipCardComponent } from './dropdown-relationship-card.component';

describe('DropdownRelationshipCardComponent', () => {
  let component: DropdownRelationshipCardComponent;
  let fixture: ComponentFixture<DropdownRelationshipCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownRelationshipCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownRelationshipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
