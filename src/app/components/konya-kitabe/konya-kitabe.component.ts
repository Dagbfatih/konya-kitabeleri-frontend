import { environment } from 'src/environments/environment';
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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { allTranslates } from 'src/app/services/translation.service';
import {
  faArrowsAlt,
  faArrowsAltH,
  faArrowsAltV,
  faCaretDown,
  faCheckCircle,
  faExpandArrowsAlt,
  faMonument,
  faPeopleArrows,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-konya-kitabe',
  templateUrl: './konya-kitabe.component.html',
  styleUrls: ['./konya-kitabe.component.css'],
})
export class KonyaKitabeComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faCaret = faCaretDown;
  faMonument = faMonument;
  histPeriods: HistPeriod[] = [];
  artifactTypes: ArtifactType[] = [];
  artifacts: ArtifactDetailsDto[] = [];
  currentArtifact: ArtifactDetailsDto;
  searchEngineForm: FormGroup;
  baseUrl = environment.baseUrl;
  dataLoaded = false;
  latitude = 37.870897465942406;
  longitude = 32.50499899799871;

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
    this.runActiveStateManagement();
    this.createSearchEngineForm();
  }

  getAllArtifactsDetails() {
    this.dataLoaded = false;
    this.artifactService
      .getAllDetailsAndDefaultImages()
      .subscribe((response) => {
        this.artifacts = response.data;
        this.dataLoaded = true;
        this.getCurrentArtifact();
      });
  }

  getCurrentArtifact() {
    this.activatedRoute.params.subscribe((param) => {
      if (param['id']) {
        this.currentArtifact = this.getArtifactById(+param['id'])!;
      } else if (param['period']) {
        if (this.checkHistPeriodContainsArtifact(param['period'])) {
          this.currentArtifact = this.artifacts.find(
            (a) =>
              a.artifact.histPeriodId ===
              this.getPeriodFromUrl(param['period']).id
          )!;
        } else {
          this.currentArtifact = this.artifacts[0];
        }
      } else {
        this.currentArtifact = this.artifacts[0];
      }
    });
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

  checkHistPeriodContainsArtifact(histPeriod: string): boolean {
    for (let i = 0; i < this.artifactTypes.length; i++) {
      const element = this.artifactTypes[i];
      let contains: boolean =
        this.getArtifactsByTypeAndPeriod(element.id, histPeriod).length > 0;

      if (contains) {
        return true;
      }
    }

    return false;
  }

  getAllartifactTypes() {
    this.artifactTypeService.getAll().subscribe((response) => {
      this.artifactTypes = response.data;
    });
  }

  getPeriodFromUrl(paramName: string): HistPeriod {
    return this.histPeriods.find((h) => h.paramName === paramName)!;
  }

  getAllHistPeriods() {
    this.histPeriodService.getAll().subscribe((response) => {
      this.histPeriods = response.data;
    });
  }

  getArtifactById(id: number): ArtifactDetailsDto | undefined {
    console.log('all artifacts', this.artifacts);
    return this.artifacts.find((a) => a.artifact.id === id);
  }

  search() {}

  getArtifactsByTypeAndPeriod(artifactTypeId: number, histPeriod: string) {
    return this.artifacts.filter(
      (a) =>
        a.artifactType.id === artifactTypeId &&
        a.historicalPeriod.paramName === histPeriod
    );
  }

  scroll(id: string) {
    this.scrollService.scroll(id, 75);
  }

  getTranslate(key?: string) {
    return allTranslates.get(key ?? '');
  }
}
