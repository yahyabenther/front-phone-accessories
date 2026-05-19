import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth'; // Points directly to your app/auth.ts file

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true; // Admin user verified!
  }

  // Not logged in as admin? Bounce them back to the login interface
  router.navigate(['/login']);
  return false;
};