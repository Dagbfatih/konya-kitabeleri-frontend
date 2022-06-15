import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from './../core/models/responseModels/ListResponseModel';
import { ArtifactDetailsDto } from './../models/dtos/artifactDetailsDto';
import { HttpClient } from '@angular/common/http';
import { Artifact } from './../models/entities/artifact';
import { Injectable } from '@angular/core';
import { ServiceRepositoryBase } from '../core/services/service.repository.base';

@Injectable({
  providedIn: 'root',
})
export class ArtifactService extends ServiceRepositoryBase<Artifact> {
  apiUrl = environment.apiUrl + 'artifacts/';
  constructor(protected httpClient: HttpClient) {
    super('artifacts', httpClient);
  }

  getAllDetails(): Observable<ListResponseModel<ArtifactDetailsDto>> {
    return this.httpClient.get<ListResponseModel<ArtifactDetailsDto>>(
      this.apiUrl + 'getalldetails'
    );
  }
}
