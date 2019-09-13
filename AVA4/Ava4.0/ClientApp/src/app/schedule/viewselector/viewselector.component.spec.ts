import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewselectorComponent } from './viewselector.component';

describe('ViewselectorComponent', () => {
  let component: ViewselectorComponent;
  let fixture: ComponentFixture<ViewselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
