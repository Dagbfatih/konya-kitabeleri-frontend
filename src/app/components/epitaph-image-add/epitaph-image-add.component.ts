import { EpitaphImage } from './../../models/entities/epitaphImage';
import { EpitaphImageService } from './../../services/epitaph-image.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faArrowLeft,
  faImage,
  faRedoAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { Artifact } from 'src/app/models/entities/artifact';
import { ArtifactAddService } from 'src/app/services/artifact-add.service';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-epitaph-image-add',
  templateUrl: './epitaph-image-add.component.html',
  styleUrls: ['./epitaph-image-add.component.css'],
})
export class EpitaphImageAddComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faTrash = faTrash;
  faImage = faImage;
  faRedoAlt = faRedoAlt;

  epitaphImageAddForm: FormGroup;
  epitaphImages: NgxFileDropEntry[] = [];
  currentArtifact: Artifact;

  constructor(
    private artifactAddService: ArtifactAddService,
    private epitaphImageService: EpitaphImageService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getArtifactInfo();
  }

  getArtifactInfo() {
    this.currentArtifact = this.artifactAddService.getArtifact();
  }

  epitaphImageDropped(images: NgxFileDropEntry[]) {
    images.forEach((i) => {
      if (
        !this.epitaphImages.map((i) => i.relativePath).includes(i.relativePath)
      ) {
        this.epitaphImages.push(i);
      }
    });
  }

  deleteEpitaphImage(image: NgxFileDropEntry) {
    this.epitaphImages = this.epitaphImages.filter((i) => i !== image);
  }

  uploadEpitaphImage() {
    let images = this.epitaphImages;

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
          this.epitaphImageService
            .addImage(file, addedEpitaphImage)
            .subscribe((response) => {
              this.toastrService.success(
                response.message,
                this.getTranslate('successful')
              );
            });
        });
      }
    }
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }

  goBack() {
    history.back();
  }
}
