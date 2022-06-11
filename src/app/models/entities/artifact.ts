export interface Artifact {
  id?: number;
  name: string;
  date: Date;
  description: string;
  epitaph:string;
  originalEpitaph:string;
  epitaphImagePath:string;
  artifactTypeId:number;
  histPeriodId:number;
}
