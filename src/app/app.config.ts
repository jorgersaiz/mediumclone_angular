import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { authFeatureKey, authReducer } from './auth/store/reducers';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './auth/store/effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(appRoutes), 
    provideStore(),
    // Poniendo aquí el effect, ya va a funcionar, y va a estar escuchando al action que le hayamos dicho para 
    // ejecutarse en cuanto se llame el action
    provideEffects(authEffects),
    // Configuración de redux devtools en la aplicación
    provideStoreDevtools({
      // La cantidad máxima de acciones que podemos guardar, ponemos límite por performance
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
    provideState(authFeatureKey, authReducer)

  ]
};
