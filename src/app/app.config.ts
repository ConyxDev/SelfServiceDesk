import { ApplicationConfig, provideZoneChangeDetection, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
/* import { apiKeyInterceptor } from './interceptors/api-key.interceptor'; */
import { httpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import ErrorService from './services/error.service';



export const appConfig: ApplicationConfig = {
  providers:
   [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
/*       withInterceptors([
        apiKeyInterceptor,
        httpErrorsInterceptor
      ]) */
    ),
    {
      provide: ErrorHandler,
      useClass: ErrorService
    }
  ]
};
