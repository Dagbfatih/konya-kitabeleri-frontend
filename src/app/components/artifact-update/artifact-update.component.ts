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

  constructor(
    private artifactService: ArtifactService,
    private formBuilder: FormBuilder,
    private artifactTypeService: ArtifactTypeService,
    private histPeriodService: HistPeriodService,
    private toastrService: ToastrService,
    private languageService: LanguageService,
    private translateService: TranslateService,
    private errorService: ErrorService,
    private artifactUpdateService: ArtifactUpdateService
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
      date: [this.artifact.artifact.date, Validators.required],
      originalEpitaph: [
        this.artifact.artifact.originalEpitaph,
        Validators.required,
      ],
      epitaphImagePath: [
        this.artifact.artifact.epitaphImagePath,
        Validators.required,
      ],
      artifactTypeId: [this.artifact.artifactType.id, Validators.required],
      histPeriodId: [this.artifact.historicalPeriod.id, Validators.required],
    });
  }

  createUpdatedArtifactsTranslatesForms() {
    return this.artifactUpdateService.getArtifactTranslateForms();
  }

  createArtifactTranslateForm(): FormGroup {
    return this.formBuilder.group({
      languageId: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      epitaph: ['', Validators.required],
    });
  }

  addArtifactTranslate() {
    this.artifactTranslates.push(this.createArtifactTranslateForm());
  }
  deleteArtifactTranslate(index: number) {
    this.artifactTranslates.removeAt(index);
  }

  update() {
    if (this.artifactUpdateForm.valid) {
      let artifactModel: Artifact = Object.assign(
        {},
        this.artifactUpdateForm.value
      );
      artifactModel.artifactTypeId = +artifactModel.artifactTypeId;
      artifactModel.histPeriodId = +artifactModel.histPeriodId;
      artifactModel.date = new Date();
      artifactModel.id = this.artifact.artifact.id;
      let artifactTranslateModels = this.getArtifactTranslates();

      this.artifactService
        .updateWithTranslations(artifactModel, artifactTranslateModels)
        .subscribe((response) => {
          this.toastrService.success(
            response.message,
            this.getTranslate('successful')
          );
        });

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
    });

    return artifactTranslates;
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

  goBack() {
    history.back();
  }
}
