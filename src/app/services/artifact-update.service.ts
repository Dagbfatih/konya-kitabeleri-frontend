import { Translate } from './../models/entities/translate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArtifactDetailsDto } from 'src/app/models/dtos/artifactDetailsDto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArtifactUpdateService {
  artifact: ArtifactDetailsDto;

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

  getArtifactTranslateForms(): FormGroup[] {
    let forms: FormGroup[] = [];

    let nameTranslates: Translate[] = this.getNameTranslates();
    let descriptionTranslates: Translate[] = this.getDescriptionTranslates();
    let epitaphTranslates: Translate[] = this.getEpitaphTranslates();
    let languages: number[] = this.getLanguagesByTranslations();

    languages.forEach((languageId) => {
      forms.push(
        this.createArtifactAddFormTranslate(
          languageId,
          nameTranslates.find((nt) => nt.languageId === languageId)?.value!,
          descriptionTranslates.find((nt) => nt.languageId === languageId)
            ?.value!,
          epitaphTranslates.find((nt) => nt.languageId === languageId)?.value!
        )
      );
    });

    return forms;
  }

  private createArtifactAddFormTranslate(
    languageId: number,
    name: string,
    description: string,
    epitaph: string
  ): FormGroup {
    return this.formBuilder.group({
      languageId: [languageId],
      name: [name, Validators.required],
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
        JSON.stringify(this.artifact)
      );
    }
  }

  getBackupData() {
    let data = sessionStorage.getItem('ArtifactUpdateForm');
    if (data !== null) {
      this.artifact = JSON.parse(data);
      sessionStorage.removeItem('ArtifactUpdateForm');
    }
  }
}
