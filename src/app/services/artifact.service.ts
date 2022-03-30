import { ArtifactDetailsDto } from './../models/dtos/artifactDetailsDto';
import { ArtifactImageService } from './artifact-image.service';
import { ArtifactDbService } from '../database/artifact-db.service';
import { HttpClient } from '@angular/common/http';
import { Artifact } from './../models/entities/artifact';
import { Injectable } from '@angular/core';
import { ServiceRepositoryBase } from '../core/services/service.repository.base';
import { ServiceRepositoryLocalBase } from '../core/services/local-database/service.repository.base.local';

@Injectable({
  providedIn: 'root',
})
export class ArtifactService extends ServiceRepositoryLocalBase<Artifact> {
  constructor(
    protected dbService: ArtifactDbService,
    private articfactImageService: ArtifactImageService
  ) {
    super(dbService);
  }

  getAllDetails(): ArtifactDetailsDto[] {
    let artifacts = this.getAll().data;
    let artifactImages = this.articfactImageService.getAll().data;

    return artifacts.map((artifact) => {
      let artifactImagesById = artifactImages.filter(
        (a) => a.artifactId === artifact.id
      )!;
      return { artifact: artifact, artifactImages: artifactImagesById };
    });
  }
}
