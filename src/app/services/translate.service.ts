import { ResponseModel } from './../core/models/responseModels/responseModel';
import { LanguageService } from './language.service';
import { TranslateDbService } from '../database/translate-db.service';
import { Translate } from './../models/entities/translate';
import { Injectable } from '@angular/core';
import { ServiceRepositoryLocalBase } from '../core/services/local-database/service.repository.base.local';
import { ServiceRepositoryBase } from '../core/services/service.repository.base';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../core/models/responseModels/ListResponseModel';

@Injectable({
  providedIn: 'root',
})
export class TranslateService extends ServiceRepositoryBase<Translate> {
  apiUrl = environment.apiUrl + 'translates/';
  constructor(protected httpClient: HttpClient) {
    super('translates', httpClient);
  }

  addMultiple(translates: Translate[]): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'addmultiple',
      translates
    );
  }

  // getAllDetails(): Observable<ListResponseModel<TranslateDetailsDto>> {
  //   return this.httpClient.get<ListResponseModel<TranslateDetailsDto>>(
  //     this.apiUrl + 'getalldetails'
  //   );
  // }

  // getAllDetailsByCode(
  //   code: string
  // ): Observable<ListResponseModel<TranslateDetailsDto>> {
  //   return this.httpClient.get<ListResponseModel<TranslateDetailsDto>>(
  //     this.apiUrl + 'getalldetailsbycode?code=' + code
  //   );
  // }

  // getAllDetailsByLanguage(
  //   languageId: number
  // ): Observable<ListResponseModel<TranslateDetailsDto>> {
  //   return this.httpClient.get<ListResponseModel<TranslateDetailsDto>>(
  //     this.apiUrl + 'getalldetailsbylanguage?languageId=' + languageId
  //   );
  // }

  getAllByLanguage(
    languageId: number
  ): Observable<ListResponseModel<Translate>> {
    return this.httpClient.get<ListResponseModel<Translate>>(
      this.apiUrl + 'getallbylanguage?languageId=' + languageId
    );
  }

  getAllByCode(code: string): Observable<ListResponseModel<Translate>> {
    return this.httpClient.get<ListResponseModel<Translate>>(
      this.apiUrl + 'getallbycode?code=' + code
    );
  }
}
