import { environment } from 'src/environments/environment';
import { ScrollService } from 'src/app/services/scroll.service';
import { ActivatedRoute } from '@angular/router';
import { ArtifactService } from 'src/app/services/artifact.service';
import { ArtifactDetailsDto } from 'src/app/models/dtos/artifactDetailsDto';
import { Component, OnInit } from '@angular/core';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-artifact-preview',
  templateUrl: './artifact-preview.component.html',
  styleUrls: ['./artifact-preview.component.css'],
})
export class ArtifactPreviewComponent implements OnInit {
  artifact: ArtifactDetailsDto;
  baseUrl = environment.baseUrl;
  
  constructor(
    private artifactService: ArtifactService,
    private activatedRoute: ActivatedRoute,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.getArtifactIdFromRoute();
  }

  getArtifactIdFromRoute() {
    this.activatedRoute.params.subscribe((param) => {
      if (param['id']) {
        this.getArtifact(param['id']);
      }
    });
  }

  getArtifact(id: number) {
    this.artifactService.getDetailsById(id).subscribe((response) => {
      this.artifact = response.data;
    });
  }

  scroll(id: string) {
    this.scrollService.scroll(id, 75);
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
