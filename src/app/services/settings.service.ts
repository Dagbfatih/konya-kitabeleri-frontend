import { LanguageService } from './language.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private languageService:LanguageService) { }

  getLanguageCodeFromLocalStorage(): string {
    let code = localStorage.getItem('code');

    if (code == null) {
      return 'tr-TR';
    } else {
      return code;
    }
  }

  getCurrentLanguage() {
    return this.languageService.getByCode(
      this.getLanguageCodeFromLocalStorage()
    );
  }

  setLanguage(languageCode: string) {
    localStorage.setItem('code', languageCode);
  }
  
}
