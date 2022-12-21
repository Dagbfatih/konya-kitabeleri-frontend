import { Component, OnInit } from '@angular/core';
import { ArtifactDetailsDto } from 'src/app/models/dtos/artifactDetailsDto';
import { RandomSlideGeneratorService } from 'src/app/services/random-slide-generator.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private randomSlideGenerator: RandomSlideGeneratorService,
    private scrollService: ScrollService,
  ) {}
  artifacts: ArtifactDetailsDto[] = [];

  ngOnInit(): void {}

  scrollTop(url: string, id: string) {
    this.scrollService.navigate(url, id, 0);
  }

  get slidesByLg() {
    return this.randomSlideGenerator.getSlidesByLg();
  }

  get slidesBySm() {
    return this.randomSlideGenerator.getSlidesBySm();
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
