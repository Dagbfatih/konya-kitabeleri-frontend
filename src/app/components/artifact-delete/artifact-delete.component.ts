import { Artifact } from './../../models/entities/artifact';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ArtifactService } from 'src/app/services/artifact.service';
import { ErrorService } from 'src/app/services/error.service';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-artifact-delete',
  templateUrl: './artifact-delete.component.html',
  styleUrls: ['./artifact-delete.component.css'],
})
export class ArtifactDeleteComponent implements OnInit {
  artifact: Artifact;

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private artifactService: ArtifactService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.artifactService.delete(this.artifact).subscribe(
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
