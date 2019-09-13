import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingDropdownComponent } from './posting-dropdown.component';

describe('PostingDropdownComponent', () => {
  let component: PostingDropdownComponent;
  let fixture: ComponentFixture<PostingDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostingDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostingDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
