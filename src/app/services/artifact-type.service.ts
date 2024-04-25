import { ItemResponseModel } from './../core/models/responseModels/ItemResponseModel';
import { Observable } from 'rxjs';
import { ArtifactType } from './../models/entities/artifactType';
import { Injectable } from '@angular/core';
import { ServiceRepositoryBase } from '../core/services/service.repository.base';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArtifactTypeService extends ServiceRepositoryBase<ArtifactType> {
  apiUrl = environment.apiUrl + 'artifactTypes/';

  constructor(protected httpClient: HttpClient) {
    super('artifactTypes', httpClient);
  }

  getById(id: number): Observable<ItemResponseModel<ArtifactType>> {
    return this.httpClient.get<ItemResponseModel<ArtifactType>>(
      this.apiUrl + 'getbyid?id=' + id
    );
  }
}
