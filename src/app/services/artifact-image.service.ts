import { ArtifactImage } from './../models/entities/artifactImage';
import { Injectable } from '@angular/core';
import { ServiceRepositoryLocalBase } from '../core/services/local-database/service.repository.base.local';
import { ArtifactImageDbService } from '../database/artifact-image-db.service';

@Injectable({
  providedIn: 'root',
})
export class ArtifactImageService extends ServiceRepositoryLocalBase<ArtifactImage> {
  constructor(protected dbService: ArtifactImageDbService) {
    super(dbService);
  }
}
