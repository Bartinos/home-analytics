import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './state/auth/auth.reducer';
import { provideHttpClient } from '@angular/common/http';
import * as authEffects from './state/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({authState: authReducer}) , provideEffects(authEffects), provideHttpClient(), provideStoreDevtools({
    maxAge: 25, logOnly: !isDevMode(), trace: false,
    traceLimit: 75, autoPause: true
  })]
};
