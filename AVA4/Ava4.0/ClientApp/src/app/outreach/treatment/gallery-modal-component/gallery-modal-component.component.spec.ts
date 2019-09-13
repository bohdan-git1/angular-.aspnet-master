import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryModalComponentComponent } from './gallery-modal-component.component';

describe('GalleryModalComponentComponent', () => {
  let component: GalleryModalComponentComponent;
  let fixture: ComponentFixture<GalleryModalComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryModalComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
