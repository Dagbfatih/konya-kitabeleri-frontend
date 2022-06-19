import { ArtifactTypeService } from './../../services/artifact-type.service';
import { ArtifactType } from './../../models/entities/artifactType';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-artifact-type-delete',
  templateUrl: './artifact-type-delete.component.html',
  styleUrls: ['./artifact-type-delete.component.css'],
})
export class ArtifactTypeDeleteComponent implements OnInit {
  artifactType: ArtifactType;

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private artifactTypeService: ArtifactTypeService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.artifactTypeService.delete(this.artifactType).subscribe(
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

    this.close();
  }

  close() {
    this.activeModal.close('Delete Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Delete Modal Dismissed');
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
