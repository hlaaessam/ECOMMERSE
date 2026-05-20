// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { provideRouter, withViewTransitions } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
// import {
//   HttpClient,
//   provideHttpClient,
//   withFetch,
//   withInterceptors,
// } from '@angular/common/http';
// import {
//   BrowserAnimationsModule,
//   provideAnimations,
// } from '@angular/platform-browser/animations';
// import { provideToastr } from 'ngx-toastr';
// import { headerInterceptor } from './core/interceptors/header.interceptor';
// import { errorsInterceptor } from './core/interceptors/errors.interceptor';
// import { NgxSpinnerModule } from 'ngx-spinner';
// import { loadingInterceptor } from './core/interceptors/loading.interceptor';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

// export const appConfig: ApplicationConfig = {
//   // withViewTransitions to make the route transitions smoother
//   providers: [
//     provideRouter(routes, withViewTransitions()),
//     provideClientHydration(),
//     provideHttpClient(
//       withFetch(),
//       withInterceptors([
//         headerInterceptor,
//         errorsInterceptor,
//         loadingInterceptor,
//       ]),
//     ),
//     provideAnimations(), //for owl carousel (slider)
//     provideToastr(), // for ngx-toastr
//     importProvidersFrom(
//       NgxSpinnerModule,
//       TranslateModule.forRoot({
//         defaultLanguage: 'en',
//         loader: {
//           provide: TranslateLoader,
//           useFactory: HttpLoaderFactory,
//           deps: [HttpClient],
//         },
//       }),
//     ),
//   ],
// };
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';

import { provideClientHydration } from '@angular/platform-browser';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

import { NgxSpinnerModule } from 'ngx-spinner';

import { provideTranslateService } from '@ngx-translate/core';

import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { headerInterceptor } from './core/interceptors/header.interceptor';
import { errorsInterceptor } from './core/interceptors/errors.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),

    provideClientHydration(),

    provideHttpClient(
      withFetch(),
      withInterceptors([
        headerInterceptor,
        errorsInterceptor,
        loadingInterceptor,
      ]),
    ),

    provideAnimations(),

    provideToastr(),

    importProvidersFrom(NgxSpinnerModule),

    provideTranslateService({
      fallbackLang: 'en',

      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json',
      }),
    }),
  ],
};
