import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PersistanceService } from '../services/persistance.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const persistanceService = inject(PersistanceService);
  const router = inject(Router);
  const isSessionPresent = (persistanceService.get('accessToken') && persistanceService.get('refreshToken'))
  if (isSessionPresent){
    return true;
  }

  // If there is not session present, navigate to the login page
  router.navigate(['/login']);
  return false;
};
