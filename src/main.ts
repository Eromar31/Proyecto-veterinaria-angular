import 'zone.js'; // 👈 Necesario para Angular clásico
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

// Unificamos todo en una sola llamada
bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    ...(appConfig?.providers || [])
  ]
}).catch((err) => console.error(err));
