import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingCodesComponent } from './posting-codes.component';

describe('PostingCodesComponent', () => {
  let component: PostingCodesComponent;
  let fixture: ComponentFixture<PostingCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostingCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostingCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
