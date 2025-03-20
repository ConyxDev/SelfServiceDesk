import { CanActivateFn } from '@angular/router';

export const isAuthGuard: CanActivateFn = (route, state) => {

  const isAuth = localStorage.getItem('auth');
  
  return true;
};
