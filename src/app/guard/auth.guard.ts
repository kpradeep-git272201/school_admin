import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.isAuthenticated();
  return true
  // if (isAuthenticated) {
  //   return true;
  // } else {
  //   router.navigate(['/login']);
  //   return false;
  // }
};
