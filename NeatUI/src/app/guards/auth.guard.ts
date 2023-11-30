import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { NewAuthService } from "../services/new-auth.service";
import { inject } from "@angular/core";
import { NgToastService } from 'ng-angular-popup';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(NewAuthService);
  const router = inject(Router);
  const toast = inject(NgToastService);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    toast.error({ detail: "ERROR", summary: "Login Required!" });
    router.navigate(['']);
    return false;
  }
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);

