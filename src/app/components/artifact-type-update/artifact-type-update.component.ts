import { ArtifactType } from './../../models/entities/artifactType';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ArtifactTypeService } from 'src/app/services/artifact-type.service';
import { ErrorService } from 'src/app/services/error.service';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-artifact-type-update',
  templateUrl: './artifact-type-update.component.html',
  styleUrls: ['./artifact-type-update.component.css'],
})
export class ArtifactTypeUpdateComponent implements OnInit {
  artifactTypeUpdateForm: FormGroup;
  artifactType: ArtifactType;

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
    this.artifactTypeUpdateForm = this.formBuilder.group({
      name: [this.artifactType.name, Validators.required],
      description: [this.artifactType.description],
    });
  }

  close() {
    this.activeModal.close('Update Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Update Modal Dismissed');
  }

  update() {
    if (this.artifactTypeUpdateForm.valid) {
      let artifactTypeModel: ArtifactType = Object.assign(
        {},
        this.artifactTypeUpdateForm.value
      );

      artifactTypeModel.id = this.artifactType.id;

      this.artifactTypeService.update(artifactTypeModel).subscribe(
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
