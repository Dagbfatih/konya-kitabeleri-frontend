import { ResponseModel } from './../../core/models/responseModels/responseModel';
import { Observable } from 'rxjs';
import { ErrorService } from './../../services/error.service';
import { ArtifactModelForTranslation } from './../../models/entities/artifactTranslateModel';
import { Translate } from './../../models/entities/translate';
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
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { allTranslates } from 'src/app/services/translation.service';
import { Artifact } from 'src/app/models/entities/artifact';
import {
  faArrowLeft,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-artifact-add',
  templateUrl: './artifact-add.component.html',
  styleUrls: ['./artifact-add.component.css'],
})
export class ArtifactAddComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faArrowLeft = faArrowLeft;
  artifactAddForm: FormGroup;
  artifactTypes: ArtifactType[] = [];
  histPeriods: HistPeriod[] = [];
  languages: Language[] = [];
  nameUuid: string;
  descriptionUuid: string;
  epitaphUuid: string;

  constructor(
    private artifactService: ArtifactService,
    private formBuilder: FormBuilder,
    private artifactTypeService: ArtifactTypeService,
    private histPeriodService: HistPeriodService,
    private toastrService: ToastrService,
    private languageService: LanguageService,
    private translateService: TranslateService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.createArtifactAddForm();
    this.getAllArtifactTypes();
    this.getAllHistPeriods();
    this.getAllLanguages();
    this.nameUuid = this.generateUUID();
    this.descriptionUuid = this.generateUUID();
    this.epitaphUuid = this.generateUUID();
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

  createArtifactAddForm() {
    this.artifactAddForm = this.formBuilder.group({
      artifactTranslates: this.formBuilder.array(
        [this.createArtifactAddFormTranslate()],
        Validators.required
      ),
      date: [Date.now(), Validators.required],
      originalEpitaph: ['', Validators.required],
      epitaphImagePath: ['path', Validators.required],
      artifactTypeId: ['', Validators.required],
      histPeriodId: ['', Validators.required],
    });
  }

  createArtifactAddFormTranslate(): FormGroup {
    return this.formBuilder.group({
      languageId: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      epitaph: ['', Validators.required],
    });
  }

  addArtifactTranslate() {
    this.artifactTranslates.push(this.createArtifactAddFormTranslate());
  }
  deleteArtifactTranslate(index: number) {
    this.artifactTranslates.removeAt(index);
  }

  add() {
    if (this.artifactAddForm.valid) {
      let artifactModel: Artifact = Object.assign(
        {},
        this.artifactAddForm.value
      );
      artifactModel.artifactTypeId = +artifactModel.artifactTypeId;
      artifactModel.histPeriodId = +artifactModel.histPeriodId;
      artifactModel.date = new Date();
      let artifactTranslateModels = this.getArtifactTranslates();

      this.artifactService
        .addWithTranslations(artifactModel, artifactTranslateModels)
        .subscribe((response) => {
          this.toastrService.success(
            response.message,
            this.getTranslate('successful')
          );
        });

      // Http Posting
    } else {
      console.log('error', this.artifactAddForm);
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

  generateUUID(): string {
    return UUID.UUID();
  }

  getLanguageNameByFormControl(formControl: AbstractControl): string {
    let languageId: number = formControl.get('languageId')?.value;
    return this.languages.find((l) => l.id === +languageId)?.languageName!;
  }

  get artifactTranslates(): FormArray {
    return this.artifactAddForm.get('artifactTranslates') as FormArray;
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }

  goBack() {
    history.back();
  }
}
