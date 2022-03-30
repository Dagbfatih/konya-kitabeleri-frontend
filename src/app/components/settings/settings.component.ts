import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/models/entities/language';
import { LanguageService } from 'src/app/services/language.service';
import { SettingsService } from 'src/app/services/settings.service';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  languageCode: string = this.settingsService.getLanguageCodeFromLocalStorage();
  languages: Language[] = [];

  constructor(
    private languageService: LanguageService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.getLanguages();
  }

  publicGetLanguageCodeFromLocalStorage(): string {
    let code = localStorage.getItem('code');

    if (code == null) {
      return 'EN-en';
    } else {
      return code;
    }
  }

  getLanguages() {
    this.languages = this.languageService.getAll().data;
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }

  onLanguageChanged(event: any) {
    this.settingsService.setLanguage(this.languageCode);
    window.location.reload();
  }

  // toggleTheme() {
  //   if (this.theme === 'bootstrap') {
  //     this.theme = 'bootstrap-dark';
  //   } else  {
  //     this.theme = 'bootstrap';
  //   }

  //   this.themeService.setTheme(this.theme)
  // }
}
