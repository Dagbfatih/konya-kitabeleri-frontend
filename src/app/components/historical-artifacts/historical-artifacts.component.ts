import { ArtifactService } from './../../services/artifact.service';
import { ArtifactDetailsDto } from './../../models/dtos/artifactDetailsDto';
import { Component, OnInit } from '@angular/core';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-historical-artifacts',
  templateUrl: './historical-artifacts.component.html',
  styleUrls: ['./historical-artifacts.component.css'],
})
export class HistoricalArtifactsComponent implements OnInit {
  artifacts: ArtifactDetailsDto[] = [];

  constructor(private artifactService: ArtifactService) {}

  ngOnInit(): void {
    this.getAllArtifactsDetails();
  }

  getAllArtifactsDetails() {
    this.artifactService.getAllDetails().subscribe((response) => {
      this.artifacts = response.data;
    });
  }

  getDate(date: Date): string {
    return date.toDateString();
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
