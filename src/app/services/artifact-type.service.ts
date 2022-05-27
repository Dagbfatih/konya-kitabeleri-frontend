import { ArtifactTypeDbService } from './../database/artifact-type-db.service';
import { ArtifactType } from './../models/entities/artifactType';
import { Injectable } from '@angular/core';
import { ServiceRepositoryLocalBase } from '../core/services/local-database/service.repository.base.local';

@Injectable({
  providedIn: 'root',
})
export class ArtifactTypeService extends ServiceRepositoryLocalBase<ArtifactType> {
  constructor(protected dbService: ArtifactTypeDbService) {
    super(dbService);
  }

  getById(id: number): ArtifactType | undefined {
    return this.dbService.getAll().data.find((a) => a.id === id);
  }
}
