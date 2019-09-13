import { TestBed, inject } from '@angular/core/testing';

import { MultiLoginService } from './multi-login.service';

describe('MultiLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultiLoginService]
    });
  });

  it('should be created', inject([MultiLoginService], (service: MultiLoginService) => {
    expect(service).toBeTruthy();
  }));
});
