import { ArtifactImage } from './../entities/artifactImage';
import { Artifact } from './../entities/artifact';
export interface ArtifactDetailsDto {
  artifact: Artifact;
  artifactImages: ArtifactImage[];
}
