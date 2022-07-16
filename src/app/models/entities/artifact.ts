export interface Artifact {
  id?: number;
  name: string;
  description: string;
  summary: string;
  epitaph: string;
  originalEpitaph: string;
  artifactTypeId: number;
  histPeriodId: number;
  yearOfConstruction: string;
  latitude?: number;
  longitude?: number;
}
