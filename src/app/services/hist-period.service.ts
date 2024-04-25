import { ItemResponseModel } from './../core/models/responseModels/ItemResponseModel';
import { Observable } from 'rxjs';
import { HistPeriod } from './../models/entities/histPeriod';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ServiceRepositoryBase } from '../core/services/service.repository.base';

@Injectable({
  providedIn: 'root',
})
export class HistPeriodService extends ServiceRepositoryBase<HistPeriod> {
  apiUrl = environment.apiUrl + 'histPeriods/';
  constructor(protected httpClient: HttpClient) {
    super('histPeriods', httpClient);
  }

  getById(id: number): Observable<ItemResponseModel<HistPeriod>> {
    return this.httpClient.get<ItemResponseModel<HistPeriod>>(
      this.apiUrl + 'getbyid?id=' + id
    );
  }
}
