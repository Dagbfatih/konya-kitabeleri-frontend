import { UserOperationClaimDetailsDto } from './../models/dtos/userOperationClaimDetailsDto';
import { ListResponseModel } from './../core/models/responseModels/ListResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { UserOperationClaim } from './../models/entities/userOperationClaim';
import { ServiceRepositoryBase } from './../core/services/service.repository.base';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserOperationClaimService extends ServiceRepositoryBase<UserOperationClaim> {
  apiUrl: string = environment.apiUrl + 'useroperationclaims/';
  constructor(protected httpClient: HttpClient) {
    super('useroperationclaims', httpClient);
  }

  getAllDetailsByUser(
    userId: number
  ): Observable<ListResponseModel<UserOperationClaimDetailsDto>> {
    return this.httpClient.get<ListResponseModel<UserOperationClaimDetailsDto>>(
      this.apiUrl + 'getalldetailsbyuser?userId=' + userId
    );
  }
}
