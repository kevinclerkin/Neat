import { TestBed } from '@angular/core/testing';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { NewAuthService } from '../services/new-auth.service';
import { NgToastService } from 'ng-angular-popup';

describe('AuthGuard', () => {
  let executeGuard: CanActivateFn;
  let authService: NewAuthService;
  let router: Router;
  let toastService: NgToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        NewAuthService,
        NgToastService,
        Router,
        
      ],
    });

    executeGuard = (...guardParameters) => 
      TestBed.inject(AuthGuard).canActivate(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot
      );

    authService = TestBed.inject(NewAuthService);
    router = TestBed.inject(Router);
    toastService = TestBed.inject(NgToastService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });


});
