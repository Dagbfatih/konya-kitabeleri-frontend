import { Component, OnInit } from '@angular/core';
import { ArtifactDetailsDto } from 'src/app/models/dtos/artifactDetailsDto';
import { ArtifactService } from 'src/app/services/artifact.service';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private artifactService: ArtifactService) {}
  artifacts: ArtifactDetailsDto[] = [];

  ngOnInit(): void {
    this.getAllArtifactsDetails();
  }

  getAllArtifactsDetails() {
    this.artifacts = this.artifactService.getAllDetails();
  }

  getDate(date: Date): string {
    return date.toDateString();
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
