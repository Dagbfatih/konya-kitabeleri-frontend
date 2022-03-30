import { Injectable } from '@angular/core';
import { Translate } from '../models/entities/translate';
import { TranslateService } from './translate.service';

export let allTranslates: Map<string, string> = new Map<string, string>();

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  values: Translate[] = [];

  constructor(private translateService: TranslateService) {}

  ngOnInit() {}

  public getAllTranslatesByCode(code: string) {
    this.values = this.translateService.getAllByCode(code);
    this.setTranslates();
  }

  setTranslates() {
    this.values.forEach((v) => {
      allTranslates.set(v.key, v.value);
    });
  }
}
