import { Router, Scroll } from '@angular/router';
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
    this.translationService.getAllByCode(this.getLanguageCode());
    this.actvateScrollPositionRestoration();
  }

  actvateScrollPositionRestoration() {
    this.router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll))
      .pipe(delay(1)) // <--------------------------- This line
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
