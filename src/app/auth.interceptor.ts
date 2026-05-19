import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  
  if (currentUser && currentUser.authdata) {
    req = req.clone({
      setHeaders: {
        Authorization: `Basic ${currentUser.authdata}`
      }
    });
  }
  return next(req);
};