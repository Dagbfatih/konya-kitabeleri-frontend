import { ArtifactImage } from './artifactImage';
import { Artifact } from './artifact';
import { ArtifactModelForTranslation } from './artifactTranslateModel';

export interface ArtifactModelForPost {
  artifact: Artifact;
  artifactModels: ArtifactModelForTranslation[];
}
