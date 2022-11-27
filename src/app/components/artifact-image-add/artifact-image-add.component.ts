import { ArtifactService } from 'src/app/services/artifact.service';
import { ToastrService } from 'ngx-toastr';
import { ArtifactImage } from './../../models/entities/artifactImage';
import { Artifact } from './../../models/entities/artifact';
import { Router } from '@angular/router';
import { ArtifactImageService } from './../../services/artifact-image.service';
import { ArtifactAddService } from './../../services/artifact-add.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  faArrowLeft,
  faImage,
  faImages,
  faRedoAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { allTranslates } from 'src/app/services/translation.service';

@Component({
  selector: 'app-artifact-image-add',
  templateUrl: './artifact-image-add.component.html',
  styleUrls: ['./artifact-image-add.component.css'],
})
export class ArtifactImageAddComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faTrash = faTrash;
  faImage = faImage;
  faRedoAlt = faRedoAlt;
  uploading = false;

  artifactImageAddForm: FormGroup;
  artifactImages: NgxFileDropEntry[] = [];
  currentArtifact: Artifact;

  constructor(
    private artifactAddService: ArtifactAddService,
    private artifactImageService: ArtifactImageService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getArtifactInfo();
  }

  getArtifactInfo() {
    this.currentArtifact = this.artifactAddService.getArtifact();
  }

  artifactImageDropped(images: NgxFileDropEntry[]) {
    images.forEach((i) => {
      if (
        !this.artifactImages.map((i) => i.relativePath).includes(i.relativePath)
      ) {
        this.artifactImages.push(i);
      }
    });
  }

  deleteArtifactImage(image: NgxFileDropEntry) {
    this.artifactImages = this.artifactImages.filter((i) => i !== image);
  }

  uploadArtifactImage() {
    let images = this.artifactImages;
    this.uploading = true;
    
    for (const droppedFile of images) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // create artifactImage
          let addedArtifactImage: ArtifactImage = {
            artifactId: this.currentArtifact.id!,
            path: '',
          };

          // http post
          
          this.artifactImageService
            .addImage(file, addedArtifactImage)
            .subscribe((response) => {
              this.uploading = false;
              this.toastrService.success(
                response.message,
                this.getTranslate('successful')
              );
              this.router.navigate(['admin/artifact/add/add-epitaph-images']);
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
