import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipcardComponent } from './relationshipcard.component';

describe('RelationshipcardComponent', () => {
  let component: RelationshipcardComponent;
  let fixture: ComponentFixture<RelationshipcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
