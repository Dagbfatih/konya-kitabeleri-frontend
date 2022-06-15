import { ArtifactImage } from './../models/entities/artifactImage';
import { Injectable } from '@angular/core';
import { ServiceRepositoryLocalBase } from '../core/services/local-database/service.repository.base.local';
import { ArtifactImageDbService } from '../database/artifact-image-db.service';
import { ServiceRepositoryBase } from '../core/services/service.repository.base';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArtifactImageService extends ServiceRepositoryBase<ArtifactImage> {
  apiUrl = environment.apiUrl + 'artifactImages/';
  constructor(
    protected httpClient: HttpClient
  ) {
    super('artifactImages', httpClient);
  }
}
