import { ItemResponseModel } from './../core/models/responseModels/ItemResponseModel';
import { Observable } from 'rxjs';
import { Language } from './../models/entities/language';
import { Injectable } from '@angular/core';
import { ServiceRepositoryBase } from '../core/services/service.repository.base';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends ServiceRepositoryBase<Language> {
  apiUrl = environment.apiUrl + 'languages/';
  constructor(protected httpClient: HttpClient) {
    super('languages', httpClient);
  }

  getByCode(code: string): Observable<ItemResponseModel<Language>> {
    return this.httpClient.get<ItemResponseModel<Language>>(
      this.apiUrl + 'getbycode?code=' + code
    );
  }
}
