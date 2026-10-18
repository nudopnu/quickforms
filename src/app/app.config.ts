import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFormlyCore } from '@ngx-formly/core';
import { IconMoonStars, IconPlus, IconSun, IconX, provideTablerIcons } from '@tabler/icons-angular';
import { routes } from './app.routes';
import { daisyFormlyConfig } from './daisy/formly-daisy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFormlyCore(daisyFormlyConfig),
    provideTablerIcons({ IconPlus, IconMoonStars, IconSun, IconX }),
  ]
};
