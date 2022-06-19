import { ArtifactType } from './../../models/entities/artifactType';
import { ArtifactTypeService } from './../../services/artifact-type.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-artifact-type-add',
  templateUrl: './artifact-type-add.component.html',
  styleUrls: ['./artifact-type-add.component.css'],
})
export class ArtifactTypeAddComponent implements OnInit {
  artifactTypeAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private artifactTypeService: ArtifactTypeService
  ) {}

  ngOnInit(): void {
    this.createartifactTypeAddForm();
  }

  createartifactTypeAddForm() {
    this.artifactTypeAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  close() {
    this.activeModal.close('Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Add Modal Dismissed');
  }

  add() {
    if (this.artifactTypeAddForm.valid) {
      let artifactTypeModel: ArtifactType = Object.assign(
        {},
        this.artifactTypeAddForm.value
      );

      this.artifactTypeService.add(artifactTypeModel).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            this.getTranslate('successful')
          );
        },
        (responseError) => {
          this.errorService.writeErrorMessages(responseError);
        }
      );
    }
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
