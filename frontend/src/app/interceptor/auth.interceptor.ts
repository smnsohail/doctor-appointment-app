import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // or from a service
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token || ''}`,
    },
  });
  return next(clonedRequest);
};
