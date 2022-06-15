import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { ScrollService } from 'src/app/services/scroll.service';
import { ArtifactTypeService } from './../../services/artifact-type.service';
import { ArtifactType } from './../../models/entities/artifactType';
import { HistPeriod } from './../../models/entities/histPeriod';
import { HistPeriodService } from './../../services/hist-period.service';
import { ArtifactService } from 'src/app/services/artifact.service';
import { ArtifactDetailsDto } from 'src/app/models/dtos/artifactDetailsDto';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-konya-kitabe',
  templateUrl: './konya-kitabe.component.html',
  styleUrls: ['./konya-kitabe.component.css'],
})
export class KonyaKitabeComponent implements OnInit {
  histPeriods: HistPeriod[] = [];
  artifactTypes: ArtifactType[] = [];
  artifactDetails: ArtifactDetailsDto[] = [];
  currentArtifact: ArtifactDetailsDto = {} as ArtifactDetailsDto;
  currentRoute: string = '';
  searchEngineForm: FormGroup;

  constructor(
    private artifactService: ArtifactService,
    private histPeriodService: HistPeriodService,
    private artifactTypeService: ArtifactTypeService,
    private scrollService: ScrollService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllArtifactsDetails();
    this.getAllHistPeriods();
    this.getAllartifactTypes();
    this.setCurrentArtifact();
    this.runActiveStateManagement();
    this.createSearchEngineForm();
  }

  createSearchEngineForm() {
    this.searchEngineForm = this.formBuilder.group({
      searchText: ['', Validators.required],
    });
  }

  runActiveStateManagement() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        $('.sub-link.active').removeClass('active');
        $('.sub-link').attr('id', function (i, val) {
          if (val === event.url) {
            $(this).addClass('active');
          }
        });
      }
    });
  }

  setCurrentArtifact() {
    this.activatedRoute.params.subscribe((param) => {
      if (param['id']) {
        this.currentArtifact = this.artifactDetails.find(
          (a) => a.artifact.id === Number(param['id'])
        )!;
      } else {
        this.currentArtifact = this.artifactDetails.find(
          (a) => a.historicalPeriod.paramName === param['period']
        )!;
      }
    });
  }

  getAllartifactTypes() {
    this.artifactTypeService.getAll().subscribe((response) => {
      this.artifactTypes = response.data;
    });
  }

  getAllHistPeriods() {
    this.histPeriodService.getAll().subscribe((response) => {
      this.histPeriods = response.data;
    });
  }

  search() {}

  getArtifactsByTypeAndPeriod(typeId: number, periodId: number) {
    return this.artifactDetails.filter(
      (a) => a.artifactType.id === typeId && a.historicalPeriod.id === periodId
    );
  }

  getAllArtifactsDetails() {
    this.artifactService.getAllDetails().subscribe((response) => {
      this.artifactDetails = response.data;
    });
  }

  createRouteUrl(
    period: string,
    artifactType: number,
    artifactId: number
  ): string {
    this.currentRoute =
      period + '/' + artifactType.toString() + '/' + artifactId.toString();
    return this.currentRoute;
  }

  selectArtifact(period: string, artifactType: number, artifactId: number) {
    this.currentArtifact = this.artifactDetails.find((a) => a.artifact.id)!;
    let param = this.createRouteUrl(period, artifactType, artifactId);

    this.router.navigate(['/konya-kitabeleri/' + param], {
      relativeTo: this.activatedRoute,
    });
    this.scrollService.scrollTop();
  }

  scroll(id: string) {
    this.scrollService.scroll(id, 75);
  }
}
