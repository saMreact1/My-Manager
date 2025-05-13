import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getRole('token');
  if(role === 'admiin') {
    router.navigate(['/admin-dashboard'])
    return true
  } else {
    router.navigate(['/home']);
    return false
  }
};
