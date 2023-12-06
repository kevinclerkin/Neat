import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AvailabilityService } from './availability.service';

describe('AvailabilityService', () => {
  let service: AvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {imports: [HttpClientModule], 
    providers: [AvailabilityService], });
    service = TestBed.inject(AvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
