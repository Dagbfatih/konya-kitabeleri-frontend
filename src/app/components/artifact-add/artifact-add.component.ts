import { ArtifactUpdateService } from 'src/app/services/artifact-update.service';
import { Router } from '@angular/router';
import { ArtifactAddService } from './../../services/artifact-add.service';
import { ArtifactImage } from './../../models/entities/artifactImage';
import { ArtifactDetailsDto } from './../../models/dtos/artifactDetailsDto';
import { ArtifactImageService } from './../../services/artifact-image.service';
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
  submitted = false;

  constructor(
    private artifactService: ArtifactService,
    private formBuilder: FormBuilder,
    private artifactTypeService: ArtifactTypeService,
    private histPeriodService: HistPeriodService,
    private toastrService: ToastrService,
    private languageService: LanguageService,
    private artifactUpdateService: ArtifactUpdateService,
    private errorService: ErrorService,
    private artifactAddService: ArtifactAddService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createArtifactAddForm();
    this.getAllArtifactTypes();
    this.getAllHistPeriods();
    this.getAllLanguages();
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
      originalEpitaph: ['', Validators.required],
      epitaphImagePath: ['path', Validators.required],
      artifactTypeId: ['', Validators.required],
      histPeriodId: ['', Validators.required],
      yearOfConstruction: ['', Validators.required],
      latitude: [''],
      longitude: [''],
    });
  }

  createArtifactAddFormTranslate(): FormGroup {
    return this.formBuilder.group({
      languageId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      epitaph: ['', Validators.required],
      summary: ['', Validators.required],
    });
  }

  addArtifactTranslate() {
    this.artifactTranslates.push(this.createArtifactAddFormTranslate());
  }
  deleteArtifactTranslate(index: number) {
    this.artifactTranslates.removeAt(index);
  }

  add() {
    this.submitted = true;
    if (this.artifactAddForm.valid) {
      let artifactModel: Artifact = Object.assign(
        {},
        this.artifactAddForm.value
      );
      artifactModel.artifactTypeId = +artifactModel.artifactTypeId;
      artifactModel.histPeriodId = +artifactModel.histPeriodId;
      artifactModel.latitude = +artifactModel.latitude!;
      artifactModel.longitude = +artifactModel.longitude!;
      let artifactTranslateModels = this.getArtifactTranslates();

      this.artifactService
        .addWithDetails(artifactModel, artifactTranslateModels)
        .subscribe(
          (response) => {
            artifactModel.id = response.data;
            this.setArtifactAddModels(artifactModel, artifactTranslateModels);
            this.toastrService.success(
              response.message,
              this.getTranslate('successful')
            );
            this.router.navigate(['/admin/artifact/upload-images']);
          },
          (responseError) => {
            this.errorService.writeErrorMessages(responseError);
          }
        );

      // Http Posting
    } else {
    }
  }

  setArtifactAddModels(
    artifact: Artifact,
    translations: ArtifactModelForTranslation[]
  ) {
    this.artifactAddService.setArtifact(artifact);
    this.artifactAddService.setTranslations(translations);
    this.artifactUpdateService.setInnerArtifact(artifact);
    this.artifactUpdateService.setTranslations(translations);
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

  get getArtifactAddFormControls() {
    return this.artifactAddForm.controls;
  }

  get getArtifactTranslateFormControls() {
    return this.artifactTranslates.controls;
  }

  goBack() {
    history.back();
  }
}
