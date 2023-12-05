import { TestBed } from '@angular/core/testing';

import { NeatServiceService } from './neat-service.service';

describe('NeatServiceService', () => {
  let service: NeatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
