import { Router } from '@angular/router';
import { ArtifactUpdateService } from './../../services/artifact-update.service';
import { ArtifactDetailsDto } from 'src/app/models/dtos/artifactDetailsDto';
import { ErrorService } from './../../services/error.service';
import { ArtifactModelForTranslation } from './../../models/entities/artifactTranslateModel';
import { TranslateService } from './../../services/translate.service';
import { Language } from './../../models/entities/language';
import { LanguageService } from 'src/app/services/language.service';
import { ToastrService } from 'ngx-toastr';
import { HistPeriodService } from './../../services/hist-period.service';
import { ArtifactTypeService } from './../../services/artifact-type.service';
import { HistPeriod } from './../../models/entities/histPeriod';
import { ArtifactType } from './../../models/entities/artifactType';
import { ArtifactService } from './../../services/artifact.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { allTranslates } from 'src/app/services/translation.service';
import { Artifact } from 'src/app/models/entities/artifact';
import {
  faArrowLeft,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-artifact-update',
  templateUrl: './artifact-update.component.html',
  styleUrls: ['./artifact-update.component.css'],
})
export class ArtifactUpdateComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faArrowLeft = faArrowLeft;
  artifactUpdateForm: FormGroup;
  artifactTypes: ArtifactType[] = [];
  histPeriods: HistPeriod[] = [];
  languages: Language[] = [];
  artifact: ArtifactDetailsDto;
  submitted = false;

  constructor(
    private artifactService: ArtifactService,
    private formBuilder: FormBuilder,
    private artifactTypeService: ArtifactTypeService,
    private histPeriodService: HistPeriodService,
    private toastrService: ToastrService,
    private languageService: LanguageService,
    private translateService: TranslateService,
    private errorService: ErrorService,
    private artifactUpdateService: ArtifactUpdateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUpdatedArtifact();
    this.createArtifactUpdateForm();
    this.getAllArtifactTypes();
    this.getAllHistPeriods();
    this.getAllLanguages();
  }

  getUpdatedArtifact() {
    this.artifact = this.artifactUpdateService.getArtifact();
  }

  getAllLanguages() {
    this.languageService.getAll().subscribe((response) => {
      this.languages = response.data;
    });
  }

  getAllHistPeriods() {
    this.histPeriodService.getAll().subscribe((response) => {
      this.histPeriods = response.data;
    });
  }

  getAllArtifactTypes() {
    this.artifactTypeService.getAll().subscribe((response) => {
      this.artifactTypes = response.data;
    });
  }

  createArtifactUpdateForm() {
    this.artifactUpdateForm = this.formBuilder.group({
      artifactTranslates: this.formBuilder.array(
        this.createUpdatedArtifactsTranslatesForms(),
        Validators.required
      ),
      yearOfConstruction: [
        this.artifact.artifact.yearOfConstruction,
        Validators.required,
      ],
      originalEpitaph: [
        this.artifact.artifact.originalEpitaph,
        Validators.required,
      ],
      artifactTypeId: [this.artifact.artifactType.id, Validators.required],
      histPeriodId: [this.artifact.historicalPeriod.id, Validators.required],
      latitude: [this.artifact.artifact.latitude],
      longitude: [this.artifact.artifact.longitude],
    });
  }

  createUpdatedArtifactsTranslatesForms() {
    return this.artifactUpdateService.getArtifactTranslateForms();
  }

  createArtifactTranslateForm(): FormGroup {
    return this.formBuilder.group({
      languageId: [''],
      name: ['', Validators.required],
      summary: ['', Validators.required],
      description: ['', Validators.required],
      epitaph: ['', Validators.required],
      yearOfConstruction: ['', Validators.required],
    });
  }

  addArtifactTranslate() {
    this.artifactTranslates.push(this.createArtifactTranslateForm());
  }
  deleteArtifactTranslate(index: number) {
    this.artifactTranslates.removeAt(index);
  }

  update() {
    this.submitted = true;
    if (this.artifactUpdateForm.valid) {
      let artifactModel: Artifact = Object.assign(
        {},
        this.artifactUpdateForm.value
      );
      artifactModel.artifactTypeId = +artifactModel.artifactTypeId;
      artifactModel.histPeriodId = +artifactModel.histPeriodId;
      artifactModel.latitude = +artifactModel.latitude!;
      artifactModel.longitude = +artifactModel.longitude!;
      artifactModel.id = this.artifact.artifact.id;
      let artifactTranslateModels = this.getArtifactTranslates();

      this.artifactService
        .updateWithDetails(artifactModel, artifactTranslateModels)
        .subscribe(
          (response) => {
            // this.setArtifactModels(artifactModel, artifactTranslateModels);
            this.toastrService.success(
              response.message,
              this.getTranslate('successful')
            );
            this.router
              .navigate(['admin/artifact/upload-images'])
              .finally(() => location.reload());
          },
          (responseError) => {
            this.errorService.writeErrorMessages(responseError);
          }
        );

      // Http Posting
    } else {
      console.log('error', this.artifactUpdateForm);
    }
  }

  getArtifactTranslates() {
    let artifactTranslates: ArtifactModelForTranslation[] = Object.assign(
      {},
      this.artifactTranslates.value
    );
    Object.values(artifactTranslates).forEach((a) => {
      a.languageId = +a.languageId;
      a.descriptionKey = '';
      a.nameKey = '';
      a.epitaphKey = '';
      a.summaryKey = '';
    });

    return artifactTranslates;
  }

  setArtifactModels(
    artifact: Artifact,
    translations: ArtifactModelForTranslation[]
  ) {
    this.artifactUpdateService.setInnerArtifact(artifact);
    this.artifactUpdateService.setTranslations(translations);
  }

  get artifactTranslates(): FormArray {
    return this.artifactUpdateForm.get('artifactTranslates') as FormArray;
  }

  getLanguageNameByFormControl(formControl: AbstractControl): string {
    let languageId: number = formControl.get('languageId')?.value;
    return this.languages.find((l) => l.id === +languageId)?.languageName!;
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }

  get getArtifactUpdateFormControls() {
    return this.artifactUpdateForm.controls;
  }

  get getArtifactTranslateFormControls() {
    return this.artifactTranslates.controls;
  }

  goBack() {
    history.back();
  }
}
