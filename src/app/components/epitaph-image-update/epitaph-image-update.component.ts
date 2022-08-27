import { Artifact } from './../../models/entities/artifact';
import { ArtifactAddService } from 'src/app/services/artifact-add.service';
import { ErrorService } from 'src/app/services/error.service';
import { EpitaphImageDeleteComponent } from './../epitaph-image-delete/epitaph-image-delete.component';
import { EpitaphImageService } from './../../services/epitaph-image.service';
import { EpitaphImage } from './../../models/entities/epitaphImage';
import { Component, OnInit } from '@angular/core';
import {
  faArrowLeft,
  faFile,
  faFileImport,
  faFileUpload,
  faImage,
  faImages,
  faLandmark,
  faMinusCircle,
  faMonument,
  faPlusCircle,
  faRedoAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { ArtifactDetailsDto } from 'src/app/models/dtos/artifactDetailsDto';
import { environment } from 'src/environments/environment';
import { ArtifactUpdateService } from 'src/app/services/artifact-update.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { allTranslates } from 'src/app/services/translation.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-epitaph-image-update',
  templateUrl: './epitaph-image-update.component.html',
  styleUrls: ['./epitaph-image-update.component.css'],
})
export class EpitaphImageUpdateComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faTrash = faTrash;
  faImages = faImages;
  faImage = faImage;
  faMinusCircle = faMinusCircle;
  faFileUpload = faPlusCircle;
  faRedoAlt = faRedoAlt;
  faLandmark = faLandmark;
  faMonument = faMonument;

  images: NgxFileDropEntry[] = [];
  currentArtifact: Artifact;
  baseUrl = environment.baseUrl;
  epitaphImages: EpitaphImage[] = [];

  constructor(
    private artifactUpdateService: ArtifactUpdateService,
    private epitaphImageService: EpitaphImageService,
    private router: Router,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private errorService: ErrorService,
    private artifactAddService: ArtifactAddService
  ) {}

  ngOnInit(): void {
    this.getArtifactInfo();
    this.getImages();
  }

  getArtifactInfo() {
    this.currentArtifact =
      this.artifactUpdateService.getInnerArtifact() ??
      this.artifactAddService.getArtifact();
  }

  getImages() {
    this.epitaphImageService
      .getallbyartifact(this.currentArtifact.id!)
      .subscribe((response) => {
        this.epitaphImages = response.data;
      });
  }

  epitaphImageDropped(images: NgxFileDropEntry[]) {
    images.forEach((i) => {
      if (!this.images.map((i) => i.relativePath).includes(i.relativePath)) {
        this.images.push(i);
      }
    });
  }

  deleteEpitaphImage(image: NgxFileDropEntry) {
    this.images = this.images.filter((i) => i !== image);
  }

  openEpitaphImageDeleteForm(epitaphImage: EpitaphImage) {
    var modalReferance = this.modalService.open(EpitaphImageDeleteComponent, {
      size: 'm',
      modalDialogClass: 'modal-dialog-centered',
    });
    modalReferance.componentInstance.epitaphImage = epitaphImage;
  }

  uploadEpitaphImage() {
    let images = this.images;

    for (const droppedFile of images) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // create artifactImage
          let addedEpitaphImage: EpitaphImage = {
            artifactId: this.currentArtifact.id!,
            path: '',
          };

          // http post
          this.epitaphImageService.addImage(file, addedEpitaphImage).subscribe(
            (response) => {
              this.toastrService.success(
                response.message,
                this.getTranslate('successful')
              );

              this.deleteEpitaphImage(droppedFile);
            },
            (responseError: HttpErrorResponse) => {
              this.errorService.writeErrorMessages(responseError);
            }
          );
        });
      }
    }
  }

  fileOver(event: any) {
    console.log(event);
  }

  fileLeave(event: any) {
    console.log(event);
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }

  goBack() {
    history.back();
  }
}
