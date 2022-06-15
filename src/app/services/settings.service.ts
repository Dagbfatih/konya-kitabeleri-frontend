import { LanguageService } from './language.service';
import { Injectable } from '@angular/core';
import { Language } from '../models/entities/language';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private languageService: LanguageService) {}

  getLanguageCodeFromLocalStorage(): string {
    let code = localStorage.getItem('code');

    if (code == null) {
      return 'tr-TR';
    } else {
      return code;
    }
  }

  getCurrentLanguage() {
    let language: Language = {} as Language;
    this.languageService
      .getByCode(this.getLanguageCodeFromLocalStorage())
      .subscribe(
        (response) => {
          language = response.data;
        },
        (responseError) => {
          language = {
            code: 'en-US',
            languageName: 'English',
          };
        }
      );

    return language;
  }

  setLanguage(languageCode: string) {
    localStorage.setItem('code', languageCode);
  }
}
