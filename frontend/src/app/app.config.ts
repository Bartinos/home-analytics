import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer } from './state/user/user.reducer';
import { provideHttpClient } from '@angular/common/http';
import * as userEffects from './state/user/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({userState: userReducer}) , provideEffects(userEffects), provideHttpClient(), provideStoreDevtools({
    maxAge: 25, logOnly: !isDevMode(), trace: false,
    traceLimit: 75, autoPause: true
  })]
};
