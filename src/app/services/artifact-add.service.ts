import { ArtifactModelForTranslation } from './../models/entities/artifactTranslateModel';
import { Injectable } from '@angular/core';
import { ArtifactDetailsDto } from '../models/dtos/artifactDetailsDto';
import { Artifact } from '../models/entities/artifact';

@Injectable({
  providedIn: 'root',
})
export class ArtifactAddService {
  title = 'artifactAddForm';
  artifact: ArtifactDetailsDto = {} as ArtifactDetailsDto;
  artifactTranslations: ArtifactModelForTranslation[] = [];
  
  constructor() {
    this.subscribeReload();
    this.getBackupData();
  }

  getTranslations() {
    return this.artifactTranslations;
  }

  setArtifact(artifact: Artifact) {
    this.artifact.artifact = artifact;
  }

  setTranslations(artifactTranslations: ArtifactModelForTranslation[]) {
    this.artifactTranslations = artifactTranslations;
  }

  getArtifactDetails() {
    return this.artifact;
  }

  getArtifact() {
    return this.artifact.artifact;
  }

  setArtifactDetails(artifact: ArtifactDetailsDto) {
    this.artifact = artifact;
  }

  // Refresh Protection
  subscribeReload() {
    window.onbeforeunload = () => {
      this.backupData();
    };
  }

  backupData() {
    if (this.artifact) {
      sessionStorage.setItem(
        this.title,
        JSON.stringify({
          artifact: this.artifact,
          translations: JSON.stringify(this.artifactTranslations),
        })
      );
    }
  }

  getBackupData() {
    let data = sessionStorage.getItem(this.title);
    if (data !== null) {
      this.artifact = JSON.parse(data).artifact;
      this.artifactTranslations = JSON.parse(data).translations;
      sessionStorage.removeItem(this.title);
    }
  }
}
