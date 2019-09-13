import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtOperationsComponent } from './pmt-operations.component';

describe('PmtOperationsComponent', () => {
  let component: PmtOperationsComponent;
  let fixture: ComponentFixture<PmtOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmtOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
