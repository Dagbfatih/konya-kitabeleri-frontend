import { ArtifactDetailsDto } from 'src/app/models/dtos/artifactDetailsDto';
import { Pipe, PipeTransform } from '@angular/core';
import { allTranslates } from '../services/translation.service';

@Pipe({
  name: 'artifactFilter',
})
export class ArtifactFilterPipe implements PipeTransform {
  transform(
    value: ArtifactDetailsDto[],
    searchText: string
  ): ArtifactDetailsDto[] {
    let artifacts: ArtifactDetailsDto[] = value;

    searchText = searchText ? searchText.toLocaleLowerCase() : '';
    artifacts = searchText
      ? artifacts.filter(
          (a) =>
            this.getTranslate(a.artifact.description)
              ?.toLocaleLowerCase()
              .indexOf(searchText) !== -1 ||
            this.getTranslate(a.artifact.epitaph)
              ?.toLocaleLowerCase()
              .indexOf(searchText) !== -1 ||
            a.artifact.latitude
              ?.toString()
              .toLocaleLowerCase()
              .indexOf(searchText) !== -1 ||
            a.artifact.longitude
              ?.toString()
              .toLocaleLowerCase()
              .indexOf(searchText) !== -1 ||
            a.artifact.originalEpitaph
              ?.toLocaleLowerCase()
              .indexOf(searchText) !== -1 ||
            a.artifact.summary?.toLocaleLowerCase().indexOf(searchText) !==
              -1 ||
            a.artifact.yearOfConstruction
              ?.toLocaleLowerCase()
              .indexOf(searchText) !== -1 ||
            this.getTranslate(a.artifact.name)
              ?.toLocaleLowerCase()
              .indexOf(searchText) !== -1
        )
      : artifacts;

    return artifacts;
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
