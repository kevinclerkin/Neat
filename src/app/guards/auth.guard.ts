import { ActivatedRouteSnapshot, CanActivateFn, CanActivateChildFn, Router, RouterStateSnapshot } from "@angular/router";
import { NewAuthService } from "../services/new-auth.service";
import { Injectable } from "@angular/core"; 
import { NgToastService } from 'ng-angular-popup';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private authService: NewAuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.toast.error({ detail: "ERROR", summary: "Login Required!" });
      this.router.navigate(['']);
      return false;
    }
  };

  canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => this.canActivate(route, state);
}
