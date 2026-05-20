import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly _TranslateService = inject(TranslateService);
  private readonly _platID = inject(PLATFORM_ID);
  //beacause we can not use docmuent direct we Renderer2 but Renderer2 not used in service so we create instance by renererfactory2
  private readonly _Renerer2 = inject(RendererFactory2).createRenderer(
    null,
    null,
  );
  constructor() {
    if (isPlatformBrowser(this._platID)) {
      // set direction
      this.setLang();
    }
  }

  setLang(): void {
    //                                      //set Default lang en
    let lang = localStorage.getItem('lang') || 'en';

    if (lang !== null) {
      // lang want to use
      this._TranslateService.use(lang!);
    }
    if (isPlatformBrowser(this._platID)) {
      if (lang === 'en') {
        // set attribute take element , attribute , value
        this._Renerer2.setAttribute(document.documentElement, 'dir', 'ltr');
        this._Renerer2.setAttribute(document.documentElement, 'lang', 'en');
      } else if (lang === 'ar') {
        this._Renerer2.setAttribute(document.documentElement, 'dir', 'rtl');
        this._Renerer2.setAttribute(document.documentElement, 'lang', 'ar');
      }
    }
  }

  changeLang(lang: string): void {
    localStorage.setItem('lang', lang);

    this.setLang();
  }
}
