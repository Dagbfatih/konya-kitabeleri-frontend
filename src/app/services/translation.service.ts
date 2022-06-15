import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../core/models/responseModels/ListResponseModel';
import { Translate } from '../models/entities/translate';
import { TranslateService } from './translate.service';

export let allTranslates: Map<string, string> = new Map<string, string>();

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  apiUrl = environment.apiUrl + 'translates/';
  values: Translate[] = [];

  constructor(private translateService: TranslateService) {}

  public getAllByCode(code: string) {
    this.translateService.getAllByCode(code).subscribe((response) => {
      this.values = response.data;
      this.setTranslates();
    });
  }

  setTranslates() {
    this.values.forEach((v) => {
      allTranslates.set(v.key, v.value);
    });
  }
}
