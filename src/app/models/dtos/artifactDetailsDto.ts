import { YoutubeVideo } from './../entities/youtubeVideo';
import { EpitaphImage } from './../entities/epitaphImage';
import { HistPeriod } from './../entities/histPeriod';
import { ArtifactType } from './../entities/artifactType';
import { ArtifactImage } from './../entities/artifactImage';
import { Artifact } from './../entities/artifact';
import { Translate } from '../entities/translate';
import { Location } from '../entities/location';
export interface ArtifactDetailsDto {
  artifact: Artifact;
  artifactType: ArtifactType;
  historicalPeriod: HistPeriod;
  artifactImages: ArtifactImage[];
  translates: Translate[];
  epitaphImage: EpitaphImage;
  youtubeVideo: YoutubeVideo;
}
