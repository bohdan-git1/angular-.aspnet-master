import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaOutreachComponent } from './ava-outreach.component';

describe('AvaOutreachComponent', () => {
  let component: AvaOutreachComponent;
  let fixture: ComponentFixture<AvaOutreachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaOutreachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaOutreachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
