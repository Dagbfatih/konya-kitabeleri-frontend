import { environment } from 'src/environments/environment';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { ArtifactImage } from './../../models/entities/artifactImage';
import { ArtifactImageService } from './../../services/artifact-image.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-artifact-image-delete',
  templateUrl: './artifact-image-delete.component.html',
  styleUrls: ['./artifact-image-delete.component.css'],
})
export class ArtifactImageDeleteComponent implements OnInit {
  artifactImage: ArtifactImage;
  baseUrl = environment.baseUrl;

  constructor(
    private activeModal: NgbActiveModal,
    private artifactImageService: ArtifactImageService,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close('Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Add Modal Dismissed');
  }

  deleteImage() {
    this.artifactImageService.delete(this.artifactImage).subscribe(
      (response) => {
        this.toastrService.success(
          response.message,
          this.getTranslate('successful')
        );
        this.close();
      },
      (responseError) => {
        this.errorService.writeErrorMessages(responseError);
      }
    );
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
