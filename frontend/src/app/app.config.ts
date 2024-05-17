import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './state/auth/auth.reducer';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import * as authEffects from './state/auth/auth.effects';
import * as measurementEffects from './state/measurementState/measurement.effects';
import { tokenInterceptor } from './shared/interceptors/auth.interceptor';
import { measurementReducer } from './state/measurementState/measurement.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({ authState: authReducer, measurementState: measurementReducer }), provideEffects(authEffects, measurementEffects), provideHttpClient(withInterceptorsFromDi()), tokenInterceptor, provideStoreDevtools({
      maxAge: 25, logOnly: !isDevMode(), trace: false,
      traceLimit: 75, autoPause: true
    })]
};
