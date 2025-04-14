import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import ErrorService from '../services/error.service';
import { inject } from '@angular/core';



export const httpErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error) => {
      errorService.handleError(error);
      return throwError(() => error);
    })
  );
};
