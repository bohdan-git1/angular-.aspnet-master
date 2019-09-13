import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLoginComponent } from './multi-login.component';

describe('MultiLoginComponent', () => {
  let component: MultiLoginComponent;
  let fixture: ComponentFixture<MultiLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
