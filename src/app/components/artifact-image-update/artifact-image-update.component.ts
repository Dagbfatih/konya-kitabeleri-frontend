import { EpitaphImageService } from './../../services/epitaph-image.service';
import { ArtifactService } from 'src/app/services/artifact.service';
import { EpitaphImageDeleteComponent } from './../epitaph-image-delete/epitaph-image-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArtifactImageDeleteComponent } from './../artifact-image-delete/artifact-image-delete.component';
import { environment } from 'src/environments/environment';
import { ArtifactDetailsDto } from 'src/app/models/dtos/artifactDetailsDto';
import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { ArtifactImageService } from 'src/app/services/artifact-image.service';
import { ArtifactUpdateService } from 'src/app/services/artifact-update.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { allTranslates } from 'src/app/services/translation.service';
import { ArtifactImage } from 'src/app/models/entities/artifactImage';
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
import { EpitaphImage } from 'src/app/models/entities/epitaphImage';

@Component({
  selector: 'app-artifact-image-update',
  templateUrl: './artifact-image-update.component.html',
  styleUrls: ['./artifact-image-update.component.css'],
})
export class ArtifactImageUpdateComponent implements OnInit {
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
  currentArtifact: ArtifactDetailsDto;
  baseUrl = environment.baseUrl;
  artifactImages: ArtifactImage[] = [];
  epitaphImages: EpitaphImage[] = [];

  constructor(
    private artifactUpdateService: ArtifactUpdateService,
    private artifactImageService: ArtifactImageService,
    private router: Router,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private epitaphImageService: EpitaphImageService
  ) {}

  ngOnInit(): void {
    this.getArtifactInfo();
    this.getImages();
    this.getEpitaphImages();
  }

  getEpitaphImages() {
    this.epitaphImageService
      .getallbyartifact(this.currentArtifact.artifact.id!)
      .subscribe((response) => {
        this.epitaphImages = response.data;
      });
  }

  getArtifactInfo() {
    this.currentArtifact = this.artifactUpdateService.getArtifact();
  }

  artifactImageDropped(images: NgxFileDropEntry[]) {
    images.forEach((i) => {
      if (!this.images.map((i) => i.relativePath).includes(i.relativePath)) {
        this.images.push(i);
      }
    });
  }

  getImages() {
    this.artifactImageService
      .getallbyartifact(this.currentArtifact.artifact.id!)
      .subscribe((response) => {
        this.artifactImages = response.data;
      });
  }

  deleteArtifactImage(image: NgxFileDropEntry) {
    this.images = this.images.filter((i) => i !== image);
  }

  openArtifactImageDeleteForm(artifactImage: ArtifactImage) {
    var modalReferance = this.modalService.open(ArtifactImageDeleteComponent, {
      size: 'm',
      modalDialogClass: 'modal-dialog-centered',
    });
    modalReferance.componentInstance.artifactImage = artifactImage;
  }

  uploadArtifactImage() {
    let images = this.images;

    for (const droppedFile of images) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // create artifactImage
          let addedArtifactImage: ArtifactImage = {
            artifactId: this.currentArtifact.artifact.id!,
            path: '',
          };

          // http post
          this.artifactImageService
            .addImage(file, addedArtifactImage)
            .subscribe((response) => {
              this.toastrService.success(
                response.message,
                this.getTranslate('successful')
              );
              this.deleteArtifactImage(droppedFile);
            });
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
