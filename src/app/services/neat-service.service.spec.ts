import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NeatService } from './neat-service.service';

describe('NeatServiceService', () => {
  let service: NeatService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {imports: [HttpClientModule],
    providers: [NeatService], });
    service = TestBed.inject(NeatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
