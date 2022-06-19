import { HistPeriod } from './../entities/histPeriod';
import { ArtifactType } from './../entities/artifactType';
import { ArtifactImage } from './../entities/artifactImage';
import { Artifact } from './../entities/artifact';
import { Translate } from '../entities/translate';
export interface ArtifactDetailsDto {
  artifact: Artifact;
  artifactType: ArtifactType;
  historicalPeriod: HistPeriod;
  artifactImages: ArtifactImage[];
  translates: Translate[];
}
