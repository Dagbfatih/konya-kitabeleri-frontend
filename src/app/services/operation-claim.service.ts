import { OperationClaim } from './../models/entities/operationClaim';
import { ServiceRepositoryBase } from './../core/services/service.repository.base';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OperationClaimService extends ServiceRepositoryBase<OperationClaim> {
  apiUrl = environment.apiUrl + 'operationclaims/';
  constructor(protected httpClient: HttpClient) {
    super('operationclaims', httpClient);
  }
}
