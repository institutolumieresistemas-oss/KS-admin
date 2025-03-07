import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const auntenticacionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (typeof(Storage) !== 'undefined'){
    if ('token' in localStorage){
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
