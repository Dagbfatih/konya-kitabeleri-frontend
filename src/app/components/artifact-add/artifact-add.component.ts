import { ToastrService } from 'ngx-toastr';
import { HistPeriodService } from './../../services/hist-period.service';
import { ArtifactTypeService } from './../../services/artifact-type.service';
import { HistPeriod } from './../../models/entities/histPeriod';
import { ArtifactType } from './../../models/entities/artifactType';
import { ArtifactService } from './../../services/artifact.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { allTranslates } from 'src/app/services/translation.service';
import { Artifact } from 'src/app/models/entities/artifact';

@Component({
  selector: 'app-artifact-add',
  templateUrl: './artifact-add.component.html',
  styleUrls: ['./artifact-add.component.css'],
})
export class ArtifactAddComponent implements OnInit {
  artifactAddForm: FormGroup;
  artifactTypes: ArtifactType[] = [];
  histPeriods: HistPeriod[] = [];

  constructor(
    private artifactService: ArtifactService,
    private formBuilder: FormBuilder,
    private artifactTypeService: ArtifactTypeService,
    private histPeriodService: HistPeriodService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createArtifactAddForm();
    this.getAllArtifactTypes();
    this.getAllHistPeriods();
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
      name: ['', Validators.required],
      date: [Date.now(), Validators.required],
      description: ['', Validators.required],
      epitaph: ['', Validators.required],
      originalEpitaph: ['', Validators.required],
      epitaphImagePath: ['path', Validators.required],
      artifactTypeId: ['', Validators.required],
      histPeriodId: ['', Validators.required],
    });
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
      this.artifactService.add(artifactModel).subscribe((response) => {
        this.toastrService.success(
          response.message,
          this.getTranslate('successful')
        );
      });
    } else {
      console.log('error', this.artifactAddForm);
    }
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
