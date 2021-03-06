import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// A. We import our loader
import { applyPolyfills, defineCustomElements }
  from '@deckdeckgo/qrcode/dist/loader';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// B. We load our component
applyPolyfills().then(() => {
  defineCustomElements(window);
});