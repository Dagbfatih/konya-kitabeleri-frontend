import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  getLanguageCodeFromLocalStorage(): string {
    let code = localStorage.getItem('code');

    if (code == null) {
      return 'tr-TR';
    } else {
      return code;
    }
  }

  setLanguage(languageCode: string) {
    localStorage.setItem('code', languageCode);
  }
  
}
