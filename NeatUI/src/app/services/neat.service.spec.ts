import { TestBed } from '@angular/core/testing';

import { NeatService } from './neat.service';

describe('NeatService', () => {
  let service: NeatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
