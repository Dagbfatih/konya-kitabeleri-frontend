import { Router, Scroll, NavigationEnd } from '@angular/router';
import { TranslationService } from './services/translation.service';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';
import { delay, filter } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tarih-project';

  constructor(
    private translationService: TranslationService,
    private settingsService: SettingsService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    // İlk yüklemede URL'den dili al
    this.initializeLanguageFromUrl();
    
    // Scroll yönetimini aktif et
    this.actvateScrollPositionRestoration();

    // Route değişimlerinde dili kontrol et
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTranslations();
      });
  }

  initializeLanguageFromUrl() {
    // SSR ile uyumlu olması için window.location kullanıyoruz
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : this.router.url;
    
    // Path'ten dil parametresini çıkar
    const segments = currentPath.split('/').filter(s => s && s.length > 0);
    const firstSegment = segments.length > 0 ? segments[0] : null;
    
    if (firstSegment && ['tr', 'en'].includes(firstSegment)) {
      // Dil parametresi var, kullan
      const fullCode = this.settingsService.convertShortCodeToFull(firstSegment);
      this.settingsService.setLanguage(fullCode);
      this.settingsService.currentLangParam = firstSegment;
      this.translationService.getAllByCode(fullCode);
    } else {
      // Dil parametresi yok, ekle
      const savedLangCode = this.settingsService.getLanguageCodeFromLocalStorage();
      const shortCode = this.settingsService.convertFullCodeToShort(savedLangCode);
      
      // Mevcut path'e dil ekle
      const pathWithoutLeadingSlash = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;
      const newUrl = pathWithoutLeadingSlash ? `/${shortCode}/${pathWithoutLeadingSlash}` : `/${shortCode}`;
      
      this.router.navigateByUrl(newUrl);
    }
  }

  updateTranslations() {
    const currentLangCode = this.getLanguageCode();
    this.translationService.getAllByCode(currentLangCode);
  }

  actvateScrollPositionRestoration() {
    this.router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll))
      .pipe(delay(1))
      .subscribe((e) => {
        if (e.position) {
          // backward navigation
          this.viewportScroller.scrollToPosition(e.position);
        } else if (e.anchor) {
          // anchor navigation
          this.viewportScroller.scrollToAnchor(e.anchor);
        } else {
          // forward navigation
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      });
  }

  getLanguageCode(): string {
    return this.settingsService.getLanguageCodeFromLocalStorage();
  }
}