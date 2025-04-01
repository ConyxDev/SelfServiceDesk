import {
  ApplicationConfig,
  provideZoneChangeDetection,
  ErrorHandler,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
/* import { apiKeyInterceptor } from './interceptors/api-key.interceptor'; */
import { httpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import ErrorService from './services/error.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    /*       withInterceptors([
        apiKeyInterceptor,
        httpErrorsInterceptor
      ]) */
    {
      provide: ErrorHandler,
      useClass: ErrorService,
    },
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'selfservicedesk-bf30d',
        appId: '1:1093297627750:web:b34dadaa33dc619d22c3a7',
        storageBucket: 'selfservicedesk-bf30d.firebasestorage.app',
        apiKey: 'AIzaSyAccugWBEaMQIytc_vQQimiaH8phXfbxss',
        authDomain: 'selfservicedesk-bf30d.firebaseapp.com',
        messagingSenderId: '1093297627750',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
};
