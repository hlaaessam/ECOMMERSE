import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);

  const _PLATFORM_ID = inject(PLATFORM_ID);
  // there are globale objects browser that are not available in server side rendering like localStorage , windows , document, loction , navigation   so we need to check if it are available before using them
  // beacuse localStorage is not available in server side rendering we need to check if it is available before using it

  // use (typeof localStorage !== 'undefined') or another way check if we are in browser
  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (localStorage.getItem('userToken') !== null) {
      return true;
    } else {
      _Router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }
};
