import { ArtifactType } from './../models/entities/artifactType';
import { Injectable } from '@angular/core';
import { DbServiceRepositoryBase } from '../core/database/db.service.repository.base';

@Injectable({
  providedIn: 'root',
})
export class ArtifactTypeDbService extends DbServiceRepositoryBase<ArtifactType> {
  data: ArtifactType[] = [
    { id: 1, name: 'Cami', description: 'Namaz yeri' },
    { id: 2, name: 'Çeşme', description: 'Su içme yeri' },
    { id: 3, name: 'Hamam', description: 'Temizlenme yeri' },
    { id: 4, name: 'Medrese', description: 'Okul' },
  ];
}
