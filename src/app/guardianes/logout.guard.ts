import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logoutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const plataforma = inject(PLATFORM_ID);
  if(isPlatformBrowser(plataforma)){
    if('token' in localStorage) {
      router.navigate(['/admin']);
      return false;
    } else {
      return true;
    }
  }
  return false;  
};
