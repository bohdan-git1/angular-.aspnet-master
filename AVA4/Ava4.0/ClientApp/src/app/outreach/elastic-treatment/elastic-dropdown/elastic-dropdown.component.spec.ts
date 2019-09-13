import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElasticDropdownComponent } from './elastic-dropdown.component';

describe('ElasticDropdownComponent', () => {
  let component: ElasticDropdownComponent;
  let fixture: ComponentFixture<ElasticDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElasticDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElasticDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
