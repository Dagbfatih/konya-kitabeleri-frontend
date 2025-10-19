import { LanguageService } from './language.service';
import { Injectable } from '@angular/core';
import { Language } from '../models/entities/language';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  defaultLanguageCode: string = 'tr-TR';
  currentLangParam: string = 'tr'; // URL'deki dil parametresi (tr, en, vs.)

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // Route değişimlerini dinle ve dil parametresini güncelle
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateLanguageFromRoute();
      });
  }

  // URL'den dil parametresini al ve localStorage'ı güncelle
  updateLanguageFromRoute() {
    const langParam = this.getLangParamFromUrl();
    if (langParam) {
      this.currentLangParam = langParam;
      const fullCode = this.convertShortCodeToFull(langParam);
      if (fullCode !== this.getLanguageCodeFromLocalStorage()) {
        this.setLanguage(fullCode);
      }
    }
  }

  // URL'den dil parametresini çıkar (/tr/home -> tr)
  getLangParamFromUrl(): string | null {
    const urlSegments = this.router.url.split('/').filter(s => s);
    if (urlSegments.length > 0) {
      const firstSegment = urlSegments[0].split('?')[0]; // Query parametrelerini temizle
      // Bilinen dil kodlarını kontrol et
      if (['tr', 'en'].includes(firstSegment)) {
        return firstSegment;
      }
    }
    return null;
  }

  // Kısa kod -> Tam kod (tr -> tr-TR, en -> en-US)
  convertShortCodeToFull(shortCode: string): string {
    const mapping: { [key: string]: string } = {
      'tr': 'tr-TR',
      'en': 'en-US',
    };
    return mapping[shortCode] || this.defaultLanguageCode;
  }

  // Tam kod -> Kısa kod (tr-TR -> tr, en-US -> en)
  convertFullCodeToShort(fullCode: string): string {
    const mapping: { [key: string]: string } = {
      'tr-TR': 'tr',
      'en-US': 'en',
    };
    return mapping[fullCode] || 'tr';
  }

  getLanguageCodeFromRoute(): string {
    let code = this.activatedRoute.snapshot.paramMap.get('lang');
    if (code == null) {
      return this.defaultLanguageCode;
    } else {
      return this.convertShortCodeToFull(code);
    }
  }

  getLanguageCodeFromLocalStorage(): string {
    let code = localStorage.getItem('code');
    if (code == null) {
      return this.defaultLanguageCode;
    } else {
      return code;
    }
  }

  getCurrentLanguageShortCode(): string {
    return this.currentLangParam;
  }

  setLanguage(languageCode: string) {
    localStorage.setItem('code', languageCode);
  }

  // URL'deki dili değiştir ve navigate et
  changeLanguageWithNavigation(newLanguageCode: string) {
    const shortCode = this.convertFullCodeToShort(newLanguageCode);
    const currentUrl = this.router.url;
    
    // URL'i parçala (query params ve fragment'ı ayır)
    const urlParts = currentUrl.split('?');
    const pathPart = urlParts[0];
    const queryPart = urlParts[1] ? '?' + urlParts[1] : '';
    
    // Path'i segment'lere ayır
    const segments = pathPart.split('/').filter(s => s && s.length > 0);
    
    // İlk segment dil kodu mu kontrol et
    if (segments.length > 0 && ['tr', 'en'].includes(segments[0])) {
      // Dil kodunu değiştir
      segments[0] = shortCode;
    } else {
      // Dil kodu yoksa başa ekle
      segments.unshift(shortCode);
    }
    
    // Yeni URL'i oluştur
    const newPath = '/' + segments.join('/') + queryPart;
    
    // Dili kaydet
    this.setLanguage(newLanguageCode);
    this.currentLangParam = shortCode;
    
    // Yeni URL'ye navigate et
    this.router.navigateByUrl(newPath).then((success) => {
      if (success) {
        // Sayfayı yenile (çevirileri güncellemek için)
        location.reload();
      } else {
        console.error('Navigation failed to:', newPath);
      }
    });
  }

  // Mevcut URL'nin tam halini döndür (QR kod için)
  getCurrentFullUrl(): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}${this.router.url}`;
  }

  // Belirli bir dil için tam URL oluştur (QR kod için)
  getUrlForLanguage(languageCode: string): string {
    const shortCode = this.convertFullCodeToShort(languageCode);
    const currentUrl = this.router.url;
    
    // Mevcut URL'den dil parametresini çıkar
    let urlWithoutLang = currentUrl;
    const langParam = this.getLangParamFromUrl();
    if (langParam) {
      urlWithoutLang = currentUrl.replace(`/${langParam}`, '');
    }
    
    if (!urlWithoutLang || urlWithoutLang === '/') {
      urlWithoutLang = '';
    }

    const baseUrl = window.location.origin;
    return `${baseUrl}/${shortCode}${urlWithoutLang}`;
  }
}