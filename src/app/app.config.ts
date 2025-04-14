import {
  ApplicationConfig,
  provideZoneChangeDetection,
  ErrorHandler, isDevMode,
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
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '../environments/environment.prod';



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
        projectId: environment.firebase.projectId,
        appId: environment.firebase.appId,
        storageBucket: environment.firebase.storageBucket,
        apiKey: environment.firebase.apiKey,
        authDomain: environment.firebase.authDomain,
        messagingSenderId: environment.firebase.messagingSenderId,
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()), provideIonicAngular({}), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ],
};
