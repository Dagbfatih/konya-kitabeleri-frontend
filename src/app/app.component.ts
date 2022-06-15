import { TranslationService } from './services/translation.service';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tarih-project';

  constructor(
    private translationService: TranslationService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.translationService.getAllByCode(this.getLanguageCode());
  }

  getLanguageCode(): string {
    return this.settingsService.getLanguageCodeFromLocalStorage();
  }
}
