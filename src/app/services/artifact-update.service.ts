import { Artifact } from 'src/app/models/entities/artifact';
import { Translate } from './../models/entities/translate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArtifactDetailsDto } from 'src/app/models/dtos/artifactDetailsDto';
import { Injectable } from '@angular/core';
import { ArtifactModelForTranslation } from '../models/entities/artifactTranslateModel';

@Injectable({
  providedIn: 'root',
})
export class ArtifactUpdateService {
  artifact: ArtifactDetailsDto;
  artifactTranslations: ArtifactModelForTranslation[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.subscribeReload();
    this.getBackupData();
  }

  getArtifact() {
    return this.artifact;
  }

  setArtifact(artifact: ArtifactDetailsDto) {
    this.artifact = artifact;
  }

  setInnerArtifact(artifact: Artifact) {
    this.artifact.artifact = artifact;
  }

  setTranslations(artifactTranslations: ArtifactModelForTranslation[]) {
    this.artifactTranslations = artifactTranslations;
  }

  getArtifactTranslateForms(): FormGroup[] {
    let forms: FormGroup[] = [];

    let nameTranslates: Translate[] = this.getNameTranslates();
    let descriptionTranslates: Translate[] = this.getDescriptionTranslates();
    let epitaphTranslates: Translate[] = this.getEpitaphTranslates();
    let summaryTranslates: Translate[] = this.getSummaryTranslates();
    let languages: number[] = this.getLanguagesByTranslations();

    languages.forEach((languageId) => {
      forms.push(
        this.createArtifactAddFormTranslate(
          languageId,
          nameTranslates.find((nt) => nt.languageId === languageId)?.value!,
          descriptionTranslates.find((dt) => dt.languageId === languageId)
            ?.value!,
          epitaphTranslates.find((et) => et.languageId === languageId)?.value!,
          summaryTranslates.find((st) => st.languageId === languageId)?.value!
        )
      );
    });

    return forms;
  }

  private createArtifactAddFormTranslate(
    languageId: number,
    name: string,
    description: string,
    epitaph: string,
    summary: string
  ): FormGroup {
    return this.formBuilder.group({
      languageId: [languageId],
      name: [name, Validators.required],
      summary: [summary, Validators.required],
      description: [description, Validators.required],
      epitaph: [epitaph, Validators.required],
    });
  }

  private getLanguagesByTranslations(): number[] {
    let languageIds: number[] = this.artifact.translates.map(
      (t) => t.languageId
    );
    languageIds = languageIds.filter((l, i) => i === languageIds.indexOf(l));
    return languageIds;
  }

  private getNameTranslates(): Translate[] {
    return this.artifact.translates.filter(
      (t) => t.key === this.artifact.artifact.name
    );
  }

  private getDescriptionTranslates(): Translate[] {
    return this.artifact.translates.filter(
      (t) => t.key === this.artifact.artifact.description
    );
  }

  private getEpitaphTranslates(): Translate[] {
    return this.artifact.translates.filter(
      (t) => t.key === this.artifact.artifact.epitaph
    );
  }

  private getSummaryTranslates(): Translate[] {
    return this.artifact.translates.filter(
      (t) => t.key === this.artifact.artifact.summary
    );
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
        'ArtifactUpdateForm',
        JSON.stringify({
          artifact: this.artifact,
          translations: this.artifactTranslations,
        })
      );
    }
  }

  getBackupData() {
    let data = sessionStorage.getItem('ArtifactUpdateForm');
    if (data !== null) {
      let parsedData = JSON.parse(data) as {
        artifact: ArtifactDetailsDto;
        translations: ArtifactModelForTranslation[];
      };
      console.log('pa', parsedData);
      this.artifact = parsedData.artifact;
      this.artifactTranslations = parsedData.translations;
      sessionStorage.removeItem('ArtifactUpdateForm');
    }
  }
}
