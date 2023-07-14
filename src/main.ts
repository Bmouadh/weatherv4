import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'zone.js';

if (environment.production) {
  enableProdMode();
}

// Setting the app module in main component
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
