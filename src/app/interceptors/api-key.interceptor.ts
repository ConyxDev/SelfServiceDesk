import { HttpClient, HttpHandler, HttpInterceptorFn, HttpHeaders } from '@angular/common/http';

/* export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  
    const url = req.url;
    const apiToken = 'xxx';
    const authReq = req.clone({
      headers: new HttpHeaders({
        'Authorization': apiToken
      })
    });
  return next(authReq);
}; */
