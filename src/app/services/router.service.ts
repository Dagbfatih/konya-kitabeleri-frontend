import { Language } from './../models/entities/language';
import { LanguageService } from './language.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  languages: Language[] = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService
  ) {
    this.getLanguages();
  }

  getLanguages() {
    this.languageService.getAll().subscribe((response) => {
      this.languages = response.data;
    });
  }

  getLanguageCode() {
    let languageCode = '';
    this.activatedRoute.params
      .subscribe((param) => {
        if (param['language']) {
          languageCode = param['language'];
          console.log('language param', param['language']);
        } else {
          languageCode = this.getLanguageFromBrowser();
          console.log('language navigator', param['language']);
        }
      })
      .unsubscribe();

    return languageCode;
  }

  getLanguageFromBrowser(): string {
    let languageCode = navigator.language;

    if (this.languages.map((l) => l.code).includes(languageCode)) {
      return languageCode;
    }

    languageCode = 'tr-TR';
    return languageCode;
  }
}
