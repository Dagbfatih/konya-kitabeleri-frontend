import { EpitaphImageService } from './../../services/epitaph-image.service';
import { EpitaphImage } from './../../models/entities/epitaphImage';
import { ArtifactUpdateService } from 'src/app/services/artifact-update.service';
import { Artifact } from 'src/app/models/entities/artifact';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArtifactService } from 'src/app/services/artifact.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-epitaph-image-delete',
  templateUrl: './epitaph-image-delete.component.html',
  styleUrls: ['./epitaph-image-delete.component.css'],
})
export class EpitaphImageDeleteComponent implements OnInit {
  epitaphImage: EpitaphImage;
  baseUrl = environment.baseUrl;

  constructor(
    private activeModal: NgbActiveModal,
    private epitaphImageService: EpitaphImageService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private artifactUpdateService: ArtifactUpdateService
  ) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close('Add Modal Closed');
  }

  dismiss() {
    this.activeModal.dismiss('Add Modal Dismissed');
  }

  deleteImage() {
    this.epitaphImageService.delete(this.epitaphImage).subscribe(
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
