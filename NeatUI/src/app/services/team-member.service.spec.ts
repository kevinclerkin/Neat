import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TeamMemberService } from './team-member.service';

describe('TeamMemberService', () => {
  let service: TeamMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {imports: [HttpClientModule],  
    providers: [TeamMemberService],});
    service = TestBed.inject(TeamMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
